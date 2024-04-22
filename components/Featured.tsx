'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCarousel from './ProductCarousel';
import axios from 'axios';

export const getProducts = async () => {
  const products = await axios.get('/api/products');
  return products.data;
};
export const getStore = async () => {
  const store = await axios.get('/api/store');
  return store.data;
};
const Featured = () => {
  interface productData {
    map(
      arg0: (product: productData, index: number) => import('react').JSX.Element
    ): import('react').ReactNode;
    name: string;
    category: string;
    price: string;
    images: string;
    index: number;
  }

  const [productsData, setProductsData] = useState<productData | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getProducts();
      const store = await getStore();
      setProductsData(categories);
      setStoreData(store);
    };

    fetchData();
  }, []);

  interface StoreData {
    currency: string;
  }

  return (
    <section className="flex flex-col w-full gap-6 p-10 justify-center items-center ">
      <div className="w-screen flex flex-col gap-1.5 justify-center items-center">
        <h2 className="text-5xl font-serif text-center">Featured</h2>
        <div className="md:w-[5%] w-[28%] bg-black dark:bg-white h-1" />
      </div>
      <div className="flex md:flex-row flex-col w-full max-w-7xl">
        <Carousel>
          <CarouselContent className="p-2 gap-2 m-4">
            {productsData &&
              storeData &&
              productsData?.map((product: any, index: number) => (
                <ProductCarousel
                  product={product}
                  index={index}
                  currency={storeData?.currency}
                />
              ))}
          </CarouselContent>
          <CarouselPrevious className=" border-2 dark:border-white dark:text-white border-black " />
          <CarouselNext className=" border-2 dark:border-white dark:text-white border-black/90 " />
        </Carousel>
      </div>
    </section>
  );
};

export default Featured;
