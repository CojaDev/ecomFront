'use client';
import { getCategories } from '@/lib/action';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const CategoryTabs = () => {
  interface categoryData {
    map(
      arg0: (category: any, index: number) => import('react').JSX.Element
    ): import('react').ReactNode;
    name: string;
    images: string;
    index: number;
  }

  const [categoryData, setCategoryData] = useState<categoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setCategoryData(categories);
    };

    fetchData();
  }, []);
  if (!categoryData) {
    return null;
  }
  return (
    <section className="flex flex-col w-full gap-8 p-10 justify-center items-center ">
      <div className="w-screen flex flex-col gap-1.5 justify-center items-center">
        <h2 className="text-5xl font-serif text-center">Category</h2>
        <div className="md:w-[5%] w-[28%] bg-black dark:bg-white h-1" />
      </div>
      <div className="flex md:flex-row flex-col w-full">
        {categoryData &&
          categoryData?.map((category: any, index: number) => (
            <Link
              key={index}
              href={'/store?cat=' + category.name.toLowerCase()}
              draggable={false}
              className="flex-1 relative overflow-hidden"
            >
              <Image
                src={category.images}
                width={400}
                height={281}
                draggable={false}
                placeholder="empty"
                alt="img"
                className="object-cover h-full w-full hover:scale-110 transition-all grayscale  hover:grayscale-0"
              />
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-black/20 flex justify-center items-center">
                <h2 className="text-white text-[3.5rem] font-serif text-center">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CategoryTabs;
