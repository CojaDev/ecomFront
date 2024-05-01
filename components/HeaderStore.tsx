'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { VARIANTS } from '@/constants/header';

interface Variant {
  header: string;
  shoe: any;
  color: string;
  height: number;
  width: number;
}
interface title {
  title: string;
}

const HeaderStore = ({ title }: title) => {
  const [headerData, setHeaderData] = useState<Variant | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * VARIANTS.length);
    setHeaderData(VARIANTS[randomIndex]);
  }, []);

  if (!headerData) {
    return (
      <header className="relative h-[45dvh] bg-[#3498db] w-screen flex  md:flex-row flex-col-reverse justify-center items-center overflow-hidden md:pb-0 px-2 pb-20">
        <h2 className="md:text-[11rem] text-8xl text-white dark:text-black font-serif antialiased">
          Loading...
        </h2>
      </header>
    );
  }

  return (
    <header
      className={`relative h-[45dvh] bg-[#3498db] w-screen flex  md:flex-row flex-col-reverse justify-center items-center   overflow-hidden md:pb-0 px-2  `}
      style={{ backgroundColor: headerData?.color }}
    >
      <div className="shape1 md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape2 md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape3 animate-spin-slow  md:block hidden dark:bg-[#0C0A09]" />
      <div className="shape4 animate-spin-slow  md:block hidden dark:bg-[#0C0A09]" />

      <div className="relative flex flex-col gap-2">
        <h2 className="xl:text-[9rem] md:text-[8rem] text-8xl dark:text-[#0f0f0f] text-white font-serif z-20 headerText ">
          {title}
        </h2>

        <div className="animate-pulse-slow">
          <Image
            src="/img/dots.png"
            alt="dots"
            width={169}
            height={163}
            draggable={false}
            className="select-none absolute -bottom-9 dots -right-28 z-0 dark:invert"
          />
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-8 h-8 text-white dark:text-[#0C0A09]  absolute  bottom-4  -translate-x-2/4 animate-bounce-slow"
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

export default HeaderStore;
