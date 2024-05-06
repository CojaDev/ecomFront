'use client';
import HeaderStore from '@/components/HeaderStore';
import Layout from '@/components/Layout';
import SpecialPage from '@/components/SpecialPage';
import { getStore } from '@/lib/action';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [doesExists, setDoesExists] = useState(false);
  const [pageText, setPageText] = useState('');
  const pathName = usePathname();
  const pageName = pathName
    .replace('/help/', '')
    .replaceAll('-', ' ')
    .replaceAll('%20', ' ');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();
        const page = store.specialPage.find(
          (page: { name: string }) =>
            page.name.toLowerCase() === pageName.toLowerCase()
        );
        if (page) {
          setDoesExists(true);
          setPageText(page.text);
        } else {
          setDoesExists(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [pageName]);

  if (loading) {
    return (
      <Layout>
        <HeaderStore title={'Loading...'} />
      </Layout>
    );
  }

  if (!doesExists) {
    return (
      <Layout>
        <HeaderStore title={'404 - Page Not Found'} />
      </Layout>
    );
  }

  return (
    <Layout>
      <HeaderStore title={pageName} />
      <SpecialPage content={pageText} />
    </Layout>
  );
};

export default Home;
