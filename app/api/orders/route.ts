import { NextRequest, NextResponse } from 'next/server';

import { mongooseConnect } from '../../../lib/mongoose';
import Orders from '../../models/Orders';

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const order = await Orders.find();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
