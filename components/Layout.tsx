'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import Footer from './Footer';
import { getStore } from '@/lib/action';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [faviconUrl, setFaviconUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();

        setFaviconUrl(store.logo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Set favicon dynamically
    const setFavicon = () => {
      const faviconLink: any =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.href = faviconUrl;
      document.head.appendChild(faviconLink);
    };

    if (faviconUrl) {
      setFavicon();
    }
  }, [faviconUrl]);
  return (
    <main className="flex relative flex-col min-h-screen font-sans">
      <Nav />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
