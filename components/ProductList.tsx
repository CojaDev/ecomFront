'use client';
import { getProducts, getStore } from '@/lib/action';
import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCarousel from './ProductCarousel';

interface Title {
  title: string;
}

const ProductList = ({ title }: Title) => {
  interface ProductData {
    name: string;
    category: string;
    price: string;
    images: string[];
    index: number;
    title: string;
    _id: string;
  }

  interface StoreData {
    currency: string;
  }

  const [productsData, setProductsData] = useState<ProductData[] | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      const store = await getStore();
      setProductsData(products);
      setStoreData(store);
    };

    fetchData();
  }, []);

  if (!storeData || !productsData) {
    return null;
  }

  let productsToDisplay = Object.values(productsData);

  if (title === 'Featured') {
    productsToDisplay = productsToDisplay.slice(0, 8);
  } else if (title === 'NEW ARRIVALS') {
    productsToDisplay = productsToDisplay.slice(-8).reverse();
  } else {
    const randomIndices = new Set();
    while (randomIndices.size < 8) {
      randomIndices.add(Math.floor(Math.random() * productsToDisplay.length));
    }
    productsToDisplay = Array.from(randomIndices).map(
      (index: any) => productsToDisplay[index]
    );
  }

  return (
    <section className="flex flex-col w-full gap-6 p-10 justify-center items-center ">
      <div className="w-screen flex flex-col gap-1.5 justify-center items-center">
        <h2 className="text-5xl font-serif text-center">{title}</h2>
        <div className="md:w-[5%] w-[28%] bg-black dark:bg-white h-1" />
      </div>
      <div className="flex md:flex-row flex-col w-full max-w-7xl ">
        <Carousel className="">
          <CarouselContent className="lg:p-2 p-1 gap-2 lg:m-4 m-0">
            {productsToDisplay.map((product) => (
              <ProductCarousel
                key={product._id}
                product={product}
                currency={storeData.currency}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className=" border-2 dark:border-white dark:text-white border-black hidden lg:flex " />
          <CarouselNext className=" border-2 dark:border-white dark:text-white border-black/90 hidden lg:flex  " />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductList;
