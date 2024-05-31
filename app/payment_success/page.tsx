'use client';
import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import useCart from '@/lib/useCart';
import axios from 'axios';
import { Suspense, useEffect } from 'react';
import HeaderStore from '@/components/HeaderStore';
import { useSearchParams } from 'next/navigation';

const HandleSearchParams = ({ cart }: any) => {
  const searchParams = useSearchParams();
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

  return null; // This component does not need to render anything
};

const SuccessPage = () => {
  const cart = useCart();

  return (
    <Layout>
      <HeaderStore title="Payment Success" />
      <Suspense fallback={<div>Loading...</div>}>
        <HandleSearchParams cart={cart} />
      </Suspense>
      <ProductList title="You Might Also Like" />
    </Layout>
  );
};

export default SuccessPage;
