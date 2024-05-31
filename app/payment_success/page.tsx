'use client';
import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import useCart from '@/lib/useCart';
import axios from 'axios';
import { Suspense, useEffect } from 'react';
import HeaderStore from '@/components/HeaderStore';
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
  const cart = useCart();

  if (!cart) {
    return (
      <Layout>
        <div className="w-full h-[85vh] flex justify-center items-center">
          <h2 className="text-8xl font-serif">Loading...</h2>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <HeaderStore title="Payment Success" />
      <Suspense fallback={<div>Loading...</div>}>
        <HandleSearchParams />
      </Suspense>
      <ProductList title="You Might Also Like" />
    </Layout>
  );
};

const HandleSearchParams = () => {
  const searchParams = useSearchParams();
  const cart = useCart();

  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (session_id) {
      console.log(session_id);
      cart.clearCart();
      axios
        .post('/api/orders', { session_id })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error completing order:', error);
        });
    }
  }, [session_id]);

  return null;
};

export default SuccessPage;
