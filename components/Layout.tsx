import React, { ReactNode } from 'react';
import Nav from '@/components/Nav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex relative flex-col min-h-screen font-sans">
      <Nav />
      {children}
    </main>
  );
};

export default Layout;
