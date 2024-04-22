import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Bebas_Neue } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from 'react-hot-toast';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-montserrat',
});
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebasNeue',
});

export const metadata: Metadata = {
  title: 'Ecommerce-Front',
  description: 'Ecommerce website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${bebasNeue.variable} ${montserrat.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            display: 'flex',
          }}
          toastOptions={{
            // Define default options
            className: 'font-sans border border-white ',
            duration: 2400,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
          }}
        />
      </body>
    </html>
  );
}
