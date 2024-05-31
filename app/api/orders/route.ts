import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

export async function POST(req: NextRequest) {
  const { session_id } = await req.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Ensure the order has been saved by the webhook
    await mongooseConnect();
    const order = await Orders.findOne({
      'recipient.email': session.customer_details!.email,
      status: 'Paid',
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Error completing order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const orderId = searchParams.get('orderId');

  try {
    await mongooseConnect();

    let order;
    if (email) {
      order = await Orders.findOne({
        'recipient.email': email,
        status: 'Paid',
      });
    } else if (orderId) {
      order = await Orders.findById(orderId);
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
