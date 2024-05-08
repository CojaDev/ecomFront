'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from './ui/button';

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

const ProductPage = ({
  product,
  currency,
}: {
  product: ProductData;
  currency: string;
}) => {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <section className="w-full p-10 mt-10 flex flex-col gap-3 max-w-[1455px] mx-auto">
      <div className="flex w-full gap-2">
        {product.images.length > 1 && (
          <div className="flex flex-col gap-2 max-w-[128px] max-h-[656px] overflow-y-auto overflow-x-hidden pr-5">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                draggable={false}
                className={`cursor-pointer border ${
                  activeImage === index
                    ? 'border-primary'
                    : 'border-transparent'
                } hover:border-primary transition-colors`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                onMouseEnter={() => setActiveImage(index)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-1 justify-center items-center">
          <img
            src={product.images[activeImage]}
            alt="Main product"
            draggable={false}
            className="max-w-[656px] min-h-[656px] max-h-[656px] border border-black"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1 px-10">
          <h1 className="text-5xl font-semibold font-serif ">{product.name}</h1>
          <p className="text-lg -mt-1.5">{product.category}</p>

          <p className="text-lg font-bold ml-0.5 mt-2">
            {product.price} {currency}
          </p>

          <Button size={'lg'} className=" text-lg  transition-all">
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
