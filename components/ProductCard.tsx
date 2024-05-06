import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Product {
  name: string;
  category: string;
  price: string;
  _id: string;
  images: string[];
}
interface StoreData {
  currency: string;
}

interface Store {
  product: Product;
  storeData: StoreData;
}
const ProductCard = ({ product, storeData }: Store) => {
  const [isImgHovered, setIsImgHovered] = useState(0);
  const [heartFill, setHeartFill] = useState('none');
  return (
    <div className="relative border p-0 border-black bg-white dark:bg-white/20 dark:text-white max-w-[300px] max-h-[407px]">
      <Link
        href={`/store/${product._id}`}
        draggable={false}
        aria-label={product.name}
        className="overflow-hidden flex flex-col gap-2 justify-center w-full "
        onMouseEnter={() => {
          setIsImgHovered(1);
        }}
        onMouseLeave={() => {
          setIsImgHovered(0);
        }}
      >
        {product.images.length > 1 ? (
          <div
            className="w-full overflow-hidden select-none max-h-[300px] max-w-[300px] min-h-[300px] min-w-[300px] border-b border-black/40 transition-all-slow"
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
            className="w-full overflow-hidden select-none max-h-[300px] max-w-[300px] min-h-[300px] min-w-[300px]  border-b border-black/40 transition-all"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </Link>
      <div className="flex flex-col p-2 relative py-3 text-black  select-none">
        <Link
          href={`/store?cat=${product.category.toLowerCase()}`}
          draggable={false}
          aria-label="category"
        >
          <p className="text-sm opacity-90 dark:text-white">
            {product.category}
          </p>
        </Link>
        <hr className="opacity-50 dark:invert" />
        <Link
          href={`/store/${product._id}`}
          draggable={false}
          aria-label="product"
        >
          <h2 className="text-black dark:text-white text-xl font-serif mt-1.5">
            {product.name}
          </h2>
        </Link>
        <h3 className="text-xl font-medium font-serif dark:text-white">
          {product.price} {storeData.currency}
        </h3>
        <div className="flex gap-0.5 absolute right-5 bottom-4">
          <button
            className="p-1 dark:text-white"
            aria-label="Cart"
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
            className="p-1 dark:invert"
            aria-label="WishList"
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
    </div>
  );
};

export default ProductCard;
