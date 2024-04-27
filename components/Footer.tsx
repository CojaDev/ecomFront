'use client';
import { getCategories, getStore } from '@/lib/action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaInstagram, FaLink, FaYoutube } from 'react-icons/fa6';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io5';
const Footer = () => {
  interface StoreData {
    name: string;
    description: string;
    currency: string;
    address: string;
    ig: string;
    fb: string;
    yt: string;
    customLink: string;
  }
  interface CategoryData {
    map(
      arg0: (category: any, index: number) => import('react').JSX.Element
    ): import('react').ReactNode;
    name: string;
  }
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [CategoryData, setCategoryData] = useState<CategoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();
        const categories = await getCategories();
        setStoreData(store);
        setCategoryData(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();
  const isValidUrl = (url: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };

  if (!storeData) {
    return null;
  }
  return (
    <footer className="w-screen flex flex-col gap-2 bg-[#120F0D] text-white dark:bg-white dark:text-black mt-16 min-h-[36rem] py-4 px-6  items-center">
      <div className="flex md:flex-row flex-col md:gap-2 gap-6 max-w-[1450px] w-full pt-16 ">
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="font-serif text-3xl mb-2">Contact Info</h2>
          <p className="opacity-60">{storeData.address}</p>
          <p className="opacity-60">
            Email: {storeData.name.toLowerCase()}@gmail.com
          </p>
          <div className="flex gap-1">
            <p className="opacity-60">Instagram: </p>
            <a
              href={storeData.ig}
              target="blank"
              className="opacity-85 hover:opacity-100 transition-all-slow"
            >
              {storeData.ig.replace('https://www.instagram.com/', '#')}
            </a>
          </div>
          {((storeData.yt && isValidUrl(storeData.yt)) ||
            (storeData.ig && isValidUrl(storeData.ig)) ||
            (storeData.fb && isValidUrl(storeData.fb)) ||
            (storeData.customLink && isValidUrl(storeData.customLink))) && (
            <h2 className="font-serif text-3xl mt-5">Follow Us On</h2>
          )}

          <div className="socials flex gap-1 mt-2">
            {storeData.ig &&
              storeData.ig !== '' &&
              isValidUrl(storeData.ig) && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  href={storeData.ig}
                  className="p-4 bg-gray-500/30 rounded-full opacity-70 hover:opacity-100 transition-all"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}

            {storeData.yt &&
              storeData.yt !== '' &&
              isValidUrl(storeData.yt) && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  href={storeData.yt}
                  className="p-4 bg-gray-500/30 rounded-full opacity-70 hover:opacity-100 transition-all"
                >
                  <IoLogoYoutube className="w-5 h-5" />
                </a>
              )}

            {storeData.fb &&
              storeData.fb !== '' &&
              isValidUrl(storeData.fb) && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  href={storeData.fb}
                  className="p-4 bg-gray-500/30 rounded-full opacity-70 hover:opacity-100 transition-all"
                >
                  <FaFacebookSquare className="w-5 h-5" />
                </a>
              )}

            {storeData.customLink &&
              storeData.customLink !== '' &&
              isValidUrl(storeData.customLink) && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  href={storeData.customLink}
                  className="p-4 bg-gray-500/30 rounded-full opacity-70 hover:opacity-100 transition-all"
                >
                  <FaLink className="w-5 h-5" />
                </a>
              )}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="font-serif text-3xl mb-2">Get Help</h2>
          <p className="opacity-60 ">Contact Us</p>
          <p className="opacity-60">Delivery Information</p>
          <p className="opacity-60">Sale Terms & Conditions</p>
          <p className="opacity-60">Privacy Notice</p>
          <p className="opacity-60">Shopping FAQs</p>
          <p className="opacity-60">Returns & Refunds</p>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="font-serif text-3xl mb-2">Popular Categories</h2>
          {CategoryData?.map((category: any, index: number) => (
            <Link
              key={index}
              href={`/store?${category.name.toLowerCase()}`}
              className="opacity-60"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h2 className="font-serif text-3xl mb-2">Get in touch</h2>
          <p className="opacity-90">{storeData.address}</p>
          <p className="opacity-90">
            Email: {storeData.name.toLowerCase()}@gmail.com
          </p>
          <p className="opacity-90">
            Instagram:{' '}
            <a href={storeData.ig} target="blank">
              {storeData.ig.replace('https://www.instagram.com/', '#')}
            </a>
          </p>
        </div>
      </div>
      <hr className="max-w-[1450px] w-full opacity-55 mt-auto" />
      <div className="flex max-w-[1450px] w-full py-6 justify-between">
        <h2>
          © {currentYear} {storeData.name}. All Rights Reserved.
        </h2>
        <h2 className="md:text-left text-center">
          Developed by{' '}
          <a target="blank" href="https://github.com/CojaDev">
            CojaDev
          </a>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
