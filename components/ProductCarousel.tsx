'useState';
import { useState } from 'react';
import Link from 'next/link';
import { CarouselItem } from '@/components/ui/carousel';
import toast from 'react-hot-toast';
interface Product {
  name: string;
  category: string;
  price: string;
  _id: string;
  images: string[];
}

interface StoreData {
  product: Product;
  currency: string;
}

const ProductCarousel = ({ product, currency }: StoreData) => {
  const [isImgHovered, setIsImgHovered] = useState(0);
  const [heartFill, setHeartFill] = useState('none');

  return (
    <CarouselItem
      key={product._id}
      className="relative sm:basis-1/4 basis1/1 border p-0 border-black bg-white"
    >
      <Link
        href={`/store/${product._id}`}
        draggable={false}
        className="overflow-hidden flex flex-col gap-2 justify-center w-full "
      >
        {product.images.length > 1 ? (
          <div
            className="w-full overflow-hidden select-none min-h-[300px] max-h-[300px] border-b border-black/40 transition-all-slow "
            onMouseEnter={() => {
              setIsImgHovered(1);
            }}
            onMouseLeave={() => {
              setIsImgHovered(0);
            }}
            style={{
              backgroundImage: `url(${product.images[isImgHovered]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <div
            className="w-full overflow-hidden select-none min-h-[300px] max-h-[300px] border-b border-black/40 transition-all"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </Link>
      <div className="flex flex-col p-2 relative py-3 text-black select-none">
        <Link
          href={'/store?' + product.category.toLowerCase()}
          draggable={false}
        >
          <p className="text-sm opacity-90">{product.category}</p>
        </Link>
        <hr className="opacity-40" />
        <Link href={'/store/' + product._id} draggable={false}>
          <h2 className="text-black text-xl font-serif mt-1.5">
            {product.name}
          </h2>
        </Link>
        <h3 className="text-xl font-medium font-serif">
          {product.price} {currency}
        </h3>

        <div className="flex gap-0.5 absolute right-5 bottom-4">
          <button
            className=" p-1"
            onClick={() => {
              toast.success('Added to cart');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:scale-125 transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
          <button
            className=" p-1"
            onClick={() => {
              toast.success('Added to Wishlist');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={heartFill}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:scale-125 transition-all"
              onMouseEnter={() => setHeartFill('solid')}
              onMouseLeave={() => setHeartFill('none')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </CarouselItem>
  );
};

export default ProductCarousel;
