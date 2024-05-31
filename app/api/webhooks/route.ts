import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const recipient = [
      {
        name: session.customer_details?.name ?? '',
        email: session.customer_details?.email ?? '',
        address: {
          street: session.shipping_details?.address?.line1 ?? '',
          city: session.shipping_details?.address?.city ?? '',
          state: session.shipping_details?.address?.state ?? '',
          postalCode: session.shipping_details?.address?.postal_code ?? '',
          country: session.shipping_details?.address?.country ?? '',
        },
      },
    ];

    const retrieveSession = await stripe.checkout.sessions.retrieve(
      session.id,
      { expand: ['line_items.data.price.product'] }
    );

    const lineItems = retrieveSession?.line_items?.data;

    const products = lineItems?.map((item) => ({
      product:
        (item.price?.product as Stripe.Product)?.metadata?.productId ?? 'N/A',
      color: (item.price?.product as Stripe.Product)?.metadata?.color ?? 'N/A',
      size: (item.price?.product as Stripe.Product)?.metadata?.size ?? 'N/A',
      quantity: item.quantity?.toString() ?? 'N/A',
    }));

    // Save the order to your database
    await mongooseConnect();
    const order = new Orders({
      recipient: recipient,
      products: products,
      status: 'Paid',
      created: new Date(),
    });

    await order.save();
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
