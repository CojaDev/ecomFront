import Store from '../../models/Store';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    await mongooseConnect();
    const store = await Store.findOne();
    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { message: 'Failed to fetch store' },
      { status: 500 }
    );
  }
}
