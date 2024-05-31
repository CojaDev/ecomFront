import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Save the order to your database
    await mongooseConnect();
    const order = new Orders({
      recipient: [
        {
          name: session.customer_details!.name!,
          email: session.customer_details!.email!,
          address: {
            street: session.customer_details!.address!.line1!,
            city: session.customer_details!.address!.city!,
            state: session.customer_details!.address!.state!,
            postalCode: session.customer_details!.address!.postal_code!,
            country: session.customer_details!.address!.country!,
          },
        },
      ],
      products: session.line_items!.data.map((item: Stripe.LineItem) => ({
        productName: item.description!,
        price: item.price!.unit_amount! / 100,
        expenses: 0, // Adjust this field based on your requirements
      })),
      status: 'Paid',
    });

    await order.save();
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
