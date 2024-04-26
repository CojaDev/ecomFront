import Product from '../../models/Product';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    await mongooseConnect();
    const product = await Product.find();
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
