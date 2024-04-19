'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { VARIANTS } from '@/constants/header';

interface Variant {
  header: string;
  shoe: any;
  color: string;
  height: number;
  width: number;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = useState<Variant | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * VARIANTS.length);
    setHeaderData(VARIANTS[randomIndex]);
  }, []);

  // Add a fallback to prevent rendering null before headerData is set
  if (!headerData) {
    // Default header data to show while loading
    return (
      <header className="relative h-[90vh] bg-[#3498db] w-screen flex  md:flex-row flex-col-reverse justify-center items-center overflow-hidden md:pb-0 px-2 pb-20">
        <h2 className="md:text-[11rem] text-8xl text-white font-serif antialiased">
          Loading...
        </h2>
      </header>
    );
  }

  return (
    <header
      className={`relative h-[90vh] bg-[#3498db] w-screen flex  md:flex-row flex-col-reverse justify-center items-center   overflow-hidden md:pb-0 px-2  pb-20`}
      style={{ backgroundColor: headerData?.color }}
    >
      {/* Background shapes */}
      <div className="shape1 md:block hidden" />
      <div className="shape2 md:block hidden" />
      <div className="shape3 animate-spin-slow  md:block hidden" />
      <div className="shape4 animate-spin-slow  md:block hidden" />

      <div className="relative flex flex-col gap-2">
        {/* Split header into words and add line breaks */}
        {headerData &&
          headerData.header.split(' ').map((word, index) => (
            <h2
              key={index}
              className="md:text-[11rem] text-8xl text-white font-serif antialiased"
            >
              {word}
              <br />
            </h2>
          ))}

        <div className="animate-pulse-slow">
          <Image
            src="/img/dots.png"
            alt="dots"
            width={169}
            height={163}
            draggable={false}
            className="select-none absolute bottom-7 dots -right-16 "
          />
        </div>
        <Button
          className="w-[30%] rounded-none select-none ml-2 text-xl dark:bg-white dark:text-black border-0 dark:hover:bg-gray-200 !py-5 font-serif"
          variant={'outline'}
        >
          Explore
        </Button>
      </div>

      {/* Shoe image */}
      <div className="shoeContainer">
        <Image
          src={headerData?.shoe}
          alt="shoe"
          width={headerData?.width || 0}
          height={headerData?.height || 0}
          placeholder="empty"
          priority={true}
          draggable={false}
          className="select-none object-cover"
        />
      </div>

      {/* Bouncing arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 text-white  absolute bottom-4 left-2/4 -translate-x-2/4 animate-bounce-slow"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </header>
  );
};

export default Header;
