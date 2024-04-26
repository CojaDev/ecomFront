import Category from '../../models/Category';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    await mongooseConnect();
    const category = await Category.find();
    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { message: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}
