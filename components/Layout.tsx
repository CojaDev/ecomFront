import React, { ReactNode } from 'react';
import Nav from '@/components/Nav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex relative flex-col min-h-screen font-sans">
      <Nav />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
