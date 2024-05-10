'use client';
import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import ProductPage from '@/components/ProductPage';
import { Button } from '@/components/ui/button';
import { getProducts, getStore } from '@/lib/action';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ProductData {
  name: string;
  category: string;
  price: string;
  images: string[];
  index: number;
  title: string;
  description: string;
  colors: string[];
  sizes: string[];
  quantity: string;
  _id: string;
}
interface StoreData {
  currency: string;
}
const Home = () => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState<ProductData | null>(null);

  const [exists, setExist] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const pathname = usePathname();
  const productId = pathname.split('/')[2];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        const store = await getStore();
        setStoreData(store);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productId && products.length > 0) {
      const foundProduct = products.find(
        (product: ProductData) => product._id === productId
      );
      if (foundProduct) {
        setProductData(foundProduct);
        setExist(true);
      } else {
        setProductData(null); // Reset product data
        setExist(false);
      }
    } else {
      setProductData(null); // Reset product data
      setExist(false);
    }
  }, [productId, products]);

  if (loading) {
    return (
      <Layout>
        <div className="w-full h-[85vh] flex justify-center items-center">
          <h2 className="text-8xl font-serif">Loading...</h2>
        </div>
      </Layout>
    );
  }
  if (!exists && !loading) {
    return (
      <Layout>
        <div className="w-full h-[85vh] flex flex-col gap-2 justify-center items-center">
          <h2 className="md:text-8xl text-6xl text-center font-serif">
            404 Product not found
          </h2>
          <Link href="/store">
            <Button className="text-lg" size={'lg'}>
              Go back
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {productData && storeData && (
        <>
          <ProductPage product={productData} currency={storeData.currency} />
          <ProductList title="You Might Also Like" />
        </>
      )}
    </Layout>
  );
};

export default Home;
