'use client';
import tinycolor from 'tinycolor2';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';
import useCart from '@/lib/useCart';
import toast from 'react-hot-toast';

interface ProductData {
  name: string;
  category: string;
  price: string;
  images: string[];
  index: number;
  title: string;
  description: string;
  quantity: string;
  colors: string[];
  sizes: string[];
  _id: string;
}

const ProductPage = ({
  product,
  currency,
}: {
  product: ProductData;
  currency: string;
}) => {
  const getColorWithOpacity = (colorName: string, opacity: number) => {
    const color = tinycolor(colorName);
    return color.setAlpha(opacity).toRgbString();
  };
  const cart = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const sections = product.description.split('\n');

  const addToCart = () => {
    if (activeColor !== null && activeSize !== null) {
      cart.addItem({
        item: product,
        quantity,
        color: product.colors[activeColor],
        size: product.sizes[activeSize],
      });
    } else {
      toast.error('Please select a color and size.');
    }
  };
  return (
    <section className="w-full p-10 mt-10 flex flex-col gap-3 max-w-[1455px] mx-auto mb-32 ">
      <div className="flex w-full xl:flex-row flex-col-reverse gap-4  p-2 ">
        {product && product.description && product.description !== '' && (
          <div className="md:hidden flex flex-col gap-2 mt-1">
            <h2 className="text-lg">Description</h2>
            <h2>{product && product.description}</h2>
          </div>
        )}
        {product.images.length > 1 && (
          <div className="flex xl:flex-col flex-row gap-2 max-w-[450px] max-h-[656px] mx-auto overflow-x-auto pb-2 overflow-y-auto  pr-5">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                draggable={false}
                className={`cursor-pointer border ${
                  activeImage === index
                    ? 'border-primary brightness-[0.98]'
                    : 'border-transparent brightness-[1]'
                }  hover:border-primary transition-all hover:brightness-95`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onMouseEnter={() => setActiveImage(index)}
              />
            ))}
          </div>
        )}
        <div className="flex flex-1 justify-center ">
          <img
            src={product.images[activeImage]}
            alt="Main product"
            draggable={false}
            className="md:max-w-[556px] max-w-screen md:min-h-[556px]  min-h-0 max-h-[556px] w-full md:w-auto  border border-black"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 md:px-28 px-2 max-w-2/4">
          <h2 className="text-5xl font-semibold font-serif ">{product.name}</h2>
          <p className="text-lg -mt-1.5">{product.category}</p>
          <p className="text-xl font-bold">
            {product.price} {currency}
          </p>
          {product &&
            product.colors &&
            product.colors.length > 0 &&
            product.colors[0] !== '' && (
              <>
                <h2 className="text-lg">Colors</h2>
                <div className="flex gap-2">
                  {product &&
                    product.colors.map((color: string, index: any) => (
                      <Button
                        key={index}
                        size={'icon'}
                        variant={'outline'}
                        className={`relative hover:brightness-90 max-w-[30px] max-h-[30px] p-3 border rounded-full capitalize font-medium transition-all ${
                          color.toLowerCase().includes('black') ||
                          color.toLowerCase().includes('blue')
                            ? 'text-white hover:text-white dark:border-white '
                            : 'text-black dark:border-white/50'
                        }${
                          index === activeColor ? 'ring-2 ring-primary' : ''
                        } `}
                        style={{
                          backgroundColor: getColorWithOpacity(color, 0.7),
                          borderColor:
                            color.toLowerCase() !== 'white'
                              ? getColorWithOpacity(color, 0.8)
                              : 'black',
                        }}
                        onClick={() => {
                          product.quantity &&
                            Number(product.quantity) > 0 &&
                            setActiveColor(index);
                        }}
                      >
                        {index === activeColor && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </Button>
                    ))}
                </div>
              </>
            )}
          {product && product.sizes && product.sizes.length > 0 && (
            <>
              <h2 className="text-lg">Sizes</h2>
              <div className="flex gap-2 flex-wrap">
                {product &&
                  product.sizes.map(
                    (size: string, index: any) =>
                      size !== '' && (
                        <Button
                          key={index}
                          size={'sm'}
                          variant={index === activeSize ? 'default' : 'outline'}
                          className={`hover:brightness-95 min-w-[38px]  uppercase border border-black dark:border-white `}
                          onClick={() => {
                            product.quantity &&
                              Number(product.quantity) > 0 &&
                              setActiveSize(index);
                          }}
                        >
                          {size}
                        </Button>
                      )
                  )}
              </div>
            </>
          )}
          {product && product.description && product.description !== '' && (
            <div className="hidden md:flex flex-col gap-2 mt-1">
              <h2 className="text-lg">Description</h2>

              {sections.map((sentence, index) => (
                <h2 key={index}>{sentence}</h2>
              ))}
            </div>
          )}
          {product.quantity && Number(product.quantity) > 0 ? (
            <Button
              size="lg"
              className="text-lg mt-5 transition-all"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          ) : (
            <p className=" text-2xl font-semibold text-center p-3 mt-2 text-red-500 border-2 border-red-400">
              Item is sold
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
