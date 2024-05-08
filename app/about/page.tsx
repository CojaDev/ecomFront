'use client';
import HeaderStore from '@/components/HeaderStore';
import Layout from '@/components/Layout';
import SpecialPage from '@/components/SpecialPage';
import { getStore } from '@/lib/action';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [aboutUs, setAboutUs] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();
        setAboutUs(store.description);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <HeaderStore title="About Us" />
      <SpecialPage content={aboutUs} />
    </Layout>
  );
};

export default Home;
