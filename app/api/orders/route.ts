import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_STRIPE_KEY!, {
  typescript: true,
});

type Data = {
  error?: string;
  order?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { session_id } = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Ensure the order has been saved by the webhook
      await mongooseConnect();
      const order = await Orders.findOne({
        'recipient.email': session.customer_details!.email,
        status: 'Paid',
      });

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
