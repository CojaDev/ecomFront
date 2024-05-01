import HeaderStore from '@/components/HeaderStore';
import Layout from '@/components/Layout';
import Products from '@/components/Products';
import React from 'react';

const Home = () => {
  return (
    <Layout>
      <HeaderStore title="store" />
      <Products />
    </Layout>
  );
};

export default Home;
