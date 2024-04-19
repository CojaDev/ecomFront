'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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

const Nav = () => {
  //const [store, setStore] = useState([]);
  // useEffect(() => {
  //  axios.get('ecom-admin-coja.vercel.app/api/store').then((res: any) => {
  //   setStore(res.data);
  //   });
  // }, []);

  const isDesktop = useMediaQuery('(max-width: 768px)');
  return !isDesktop ? (
    <nav className="flex w-full justify-between px-4  top-0   min-h-16 ">
      <div className="flex items-center gap-2 justify-between w-full ">
        <ModeToggle />
        <NavigationMenu className="px-2 py-4  w-full  justify-between md:flex hidden">
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/store" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Store
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <h2 className="font-medium text-4xl mt-0.5 cursor-pointer mx-10 font-serif select-none">
                  Trendster.
                </h2>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant={'outline'} className="px-2">
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
      </div>
    </nav>
  ) : (
    <nav className="  bg-white dark:bg-[#0C0A09] px-5 py-4 flex w-full min-h-16  justify-between md:hidden items-center">
      <h2 className="font-semibold text-2xl mt-1">Trendster.</h2>

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
              <DrawerTitle className="text-2xl mt-9">Trendster.</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <NavigationMenuMobile>
                <NavigationMenuListMobile>
                  <NavigationMenuItemMobile>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        Home
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link href="/store" legacyBehavior passHref>
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        Store
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLinkMobile
                        className={navigationMenuTriggerStyleMobile()}
                      >
                        About
                      </NavigationMenuLinkMobile>
                    </Link>
                  </NavigationMenuItemMobile>
                  <NavigationMenuItemMobile>
                    <Link href="/contact" legacyBehavior passHref>
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
