'use client';
import { getProducts, getStore } from '@/lib/action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SLOGANS } from '@/constants';
const FeaturedProduct = () => {
  interface ProductData {
    name: string;
    category: string;
    price: string;
    images: string[];
    index: number;
    title: string;
    description: string;
    _id: string;
  }

  interface StoreData {
    currency: string;
  }

  const [productsData, setProductsData] = useState<ProductData[] | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [featuredProduct, setFeaturedProduct] = useState<ProductData | null>(
    null
  );
  const [randomSlogan, setRandomSlogan] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getProducts();
        const store = await getStore();
        setProductsData(categories);
        setStoreData(store);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const randomIndex = Math.floor(Math.random() * productsData.length);
      setFeaturedProduct(productsData[randomIndex]);
    }
  }, [productsData]);

  useEffect(() => {
    const slogans = SLOGANS;
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setRandomSlogan(slogans[randomIndex]);
  }, []);

  if (!storeData || !featuredProduct) {
    return null;
  }

  return (
    <section className="relative w-screen flex  gap-4  justify-evenly items-center py-20 my-5 px-4 bg-[#120F0D] dark:bg-white dark:text-black text-white">
      <div className="flex md:flex-row flex-col  md:gap-5 gap-10 justify-center items-center">
        <div className="flex flex-col gap-4 md:text-left text-center ">
          <h2 className="md:text-7xl text-6xl font-bold font-serif">
            {featuredProduct.name}
          </h2>
          <p className="text-lg">{randomSlogan}</p>
          <Link
            href={`/store?${featuredProduct._id}`}
            legacyBehavior
            passHref
            draggable={false}
          >
            <Button
              className="md:w-[30%] w-full dark:text-white hover:opacity-95 text-black rounded-none z-20 select-none ml-0.5 text-xl  border-0  !py-5 font-serif"
              variant={'outline'}
            >
              Explore
            </Button>
          </Link>
        </div>
        <div className="relative w-80 h-80 cursor-pointer  rounded-[40%] overflow-hidden">
          <Link
            href={`/store?${featuredProduct._id}`}
            legacyBehavior
            passHref
            draggable={false}
          >
            <Image
              src={featuredProduct.images[0]}
              layout="fill"
              objectFit="cover"
              alt={featuredProduct.name}
              className="h-full featured "
              draggable={false}
            />
          </Link>
        </div>
      </div>
      <div className="shape1 md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape2 md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape3 animate-spin-slow  md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape4 animate-spin-slow  md:block hidden dark:bg-[#0C0A09]" />
    </section>
  );
};

export default FeaturedProduct;
