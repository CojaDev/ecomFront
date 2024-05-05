'use client';
import React, { useState, useEffect } from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import {
  NavigationMenuMobile,
  NavigationMenuItemMobile,
  NavigationMenuLinkMobile,
  NavigationMenuListMobile,
  navigationMenuTriggerStyleMobile,
} from '@/components/ui/navigation-menu-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ui/theme-toggle';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/media-query';
import { getStore, getCategories } from '@/lib/action';

const Nav = () => {
  interface Admin {
    name: string;
    email: string;
    img?: string;
  }

  interface StoreData {
    name: string;
    description: string;
    address?: string;
    currency: string;
    admins: Admin[];
    fb?: string;
    ig?: string;
    yt?: string;
    customLink?: string;
  }

  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const store = await getStore();
      setStoreData(store);
    };

    fetchData();
  }, []);

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

  const isDesktop = useMediaQuery('(max-width: 1024px)');
  return !isDesktop ? (
    <nav className=" w-full justify-between px-6 py-4 top-0   min-h-16 lg:flex hidden">
      <div className="relative flex items-center gap-2 justify-between w-full  ">
        <ModeToggle />
        <NavigationMenu className="absolute left-[50%] -translate-x-2/4 px-2 py-4  w-full  justify-between  select-none">
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref draggable={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/store"
                legacyBehavior
                passHref
                draggable={false}
                aria-label="Link"
              >
                <NavigationMenuTrigger className="relative">
                  Store
                </NavigationMenuTrigger>
              </Link>
              {categoryData && (
                <NavigationMenuContent className="flex flex-col gap-2 p-2">
                  {categoryData &&
                    categoryData?.map((category: any, index: number) => (
                      <Link
                        key={index}
                        href={'/store?' + category.name.toLowerCase()}
                        draggable={false}
                        className="w-full  flex  overflow-hidden"
                        aria-label="Category"
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          <h2 className=" font-serif">{category.name}</h2>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/"
                legacyBehavior
                passHref
                draggable={false}
                aria-label="Link"
              >
                <h2 className="font-medium text-4xl mt-0.5 min-w-[100px] text-center cursor-pointer mx-10 font-serif select-none">
                  {storeData && storeData.name + '.'}
                </h2>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                legacyBehavior
                passHref
                draggable={false}
                aria-label="Link"
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/contact"
                legacyBehavior
                passHref
                draggable={false}
                aria-label="Link"
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          variant={'outline'}
          aria-label="Cart"
          className="px-3 flex gap-2 font-serif text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          cart (0)
        </Button>
      </div>
    </nav>
  ) : (
    <nav className="  bg-white dark:bg-[#0C0A09] px-5 py-4 flex w-full min-h-16  justify-between lg:hidden items-center">
      <h2 className="font-semibold text-2xl mt-1">
        {storeData && storeData.name}.
      </h2>

      <Button variant={'outline'} className=" ml-auto mr-2 px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </Button>

      <div className="flex gap-3">
        <Drawer direction="top">
          <DrawerTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-2xl mt-9">
                {storeData && storeData.name}.
              </DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <NavigationMenuMobile>
                <NavigationMenuListMobile>
                  <NavigationMenuItemMobile>
                    <Link href="/" legacyBehavior passHref aria-label="Link">
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        Home
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link
                      href="/store"
                      legacyBehavior
                      passHref
                      aria-label="Link"
                    >
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        Store
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link
                      href="/about"
                      legacyBehavior
                      passHref
                      aria-label="Link"
                    >
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        About
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link
                      href="/contact"
                      legacyBehavior
                      passHref
                      aria-label="Link"
                    >
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        Contact
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <ModeToggle />
                  </NavigationMenuItemMobile>
                </NavigationMenuListMobile>
              </NavigationMenuMobile>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Nav;
