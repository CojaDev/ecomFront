import HeaderStore from '@/components/HeaderStore';
import Layout from '@/components/Layout';
import Products from '@/components/Products';
import React, { Suspense } from 'react';

const Home = () => {
  return (
    <Layout>
      <HeaderStore title="store" />
      <Suspense>
        <Products />
      </Suspense>
    </Layout>
  );
};

export default Home;
