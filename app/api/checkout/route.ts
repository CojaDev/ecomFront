import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import Store from '../../models/Store';
import { mongooseConnect } from '../../../lib/mongoose';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    await mongooseConnect();
    const store = await Store.findOne();
    const currency = store.currency.toLowerCase();
    const { cartItems } = await req.json();

    if (!cartItems) {
      return new NextResponse('Not enough data to checkout', { status: 400 });
    }

    const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
      typescript: true,
    });
    const shippingRate = await stripe.shippingRates.create({
      display_name: 'Ground shipping',
      type: 'fixed_amount',
      fixed_amount: {
        amount: 50000,
        currency: currency,
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'RS'],
      },
      shipping_options: [{ shipping_rate: shippingRate.id }],

      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: currency,
          product_data: {
            name: cartItem.item.name,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: 'guest',
      success_url: `${process.env.STORE_URL}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.STORE_URL}/cart`,
    });

    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log('[checkout_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
