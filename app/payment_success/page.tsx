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
      cart.clearCart();
    }
  }, [session_id]);

  return null;
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
