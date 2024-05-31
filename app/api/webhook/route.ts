// pages/api/webhooks/stripe.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false, // Stripe needs the raw body to validate the webhook signature
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session: any = event.data.object as Stripe.Checkout.Session;

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
        products: session.display_items!.map((item: any) => ({
          productName: item.custom!.name!,
          price: item.amount_total! / 100,
          expenses: 0, // Adjust this field based on your requirements
        })),
        status: 'Paid',
      });

      await order.save();
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
