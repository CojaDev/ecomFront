import Orders from '../../models/Orders';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

const updateIndexes = async () => {
  try {
    const products = await Orders.find().sort({ _id: 1 });
    for (let i = 0; i < products.length; i++) {
      products[i].index = i;
      await products[i].save();
    }
  } catch (error) {
    console.error('Error updating indexes:', error);
  }
};

//updateIndexes();

export async function PUT(request: any) {
  try {
    await mongooseConnect();
    const {
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    } = await request.json();
    const newOrder = new Orders({
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    });
    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating Order:', error);
    return NextResponse.json(
      { message: 'Failed to create Order' },
      { status: 500 }
    );
  }
}

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
    const { cartItems } = await req.json();

    if (!cartItems) {
      return new NextResponse('Not enough data to checkout', { status: 400 });
    }

    const stripe = require('stripe')(
      'sk_test_51PGMsUP3DUFcVIifUav2zjT5Ms0kxSuqX1uchjC5x5ZNKIVuM4D1DY2JxYsyfy2nXYELaHw5xSRRbjmkQNQ2Dz0M00iBRt4dNS'
    );
    const shippingRate = await stripe.shippingRates.create({
      display_name: 'Ground shipping',
      type: 'fixed_amount',
      fixed_amount: {
        amount: 50000,
        currency: 'rsd',
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
          currency: 'rsd',
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
      success_url: `${process.env.STORE_URL}/payment_success`,
      cancel_url: `${process.env.STORE_URL}/cart`,
    });

    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log('[checkout_POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}