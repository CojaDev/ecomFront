'useState';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselItem } from '@/components/ui/carousel';

interface Product {
  name: string;
  category: string;
  price: string;
  images: string[];
}

interface StoreData {
  product: Product;
  index: number;
  currency: string;
}

const ProductCarousel = ({ product, index, currency }: StoreData) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CarouselItem
      className="relative sm:basis-1/4 basis1/1 border p-0 border-black bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        key={index}
        href={`/store?${product.name.toLowerCase()}`}
        draggable={false}
        className="overflow-hidden flex flex-col gap-2 justify-center w-full h-full"
      >
        <div className="flex justify-center items-center w-full select-none">
          <Image
            src={product.images[0]}
            width={400}
            height={281}
            draggable={false}
            placeholder="empty"
            alt="img"
            className="object-cover w-full"
          />
        </div>
        <div className="flex flex-col p-2">
          <p className="text-sm">{product.category}</p>
          <hr />
          <h2 className="text-black text-xl font-serif mt-1.5">
            {product.name}
          </h2>
          <h3>
            {product.price} {currency}
          </h3>
        </div>
      </Link>
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200/50 flex justify-center items-center">
          <button>ADD to CART</button>
        </div>
      )}
    </CarouselItem>
  );
};

export default ProductCarousel;
