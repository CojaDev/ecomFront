import Orders from '../../models/Orders';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

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

updateIndexes();

export async function POST(request: any) {
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
