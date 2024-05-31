import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const order = await Orders.find();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { message: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
