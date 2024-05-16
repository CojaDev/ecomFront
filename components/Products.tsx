'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getStore } from '@/lib/action';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ProductCard from './ProductCard';
import { Slider } from '@/components/ui/slider';
import CustomSlider from './CustomSlider';
import { useSearchParams } from 'next/navigation';
interface ProductData {
  name: string;
  category: string;
  price: string;
  images: string[];
  index: number;
  title: string;
  sizes: [string];
  description: string;
  _id: string;
}

interface StoreData {
  currency: string;
}

const Products = () => {
  const [productsData, setProductsData] = useState<ProductData[] | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    ProductData[] | null
  >(null);
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [productsPerRow, setProductsPerRow] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const productsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get('cat');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const store = await getStore();
        setProductsData(products);
        setFilteredProducts(products);
        setStoreData(store);

        // Determine maximum price
        const prices = products.map((product: any) => parseInt(product.price));
        const maxPriceValue = Math.max(...prices) + 10;
        const minPriceValue = Math.min(...prices);
        setMaxPrice(maxPriceValue);
        setMinPrice(minPriceValue);
        setPriceRange([minPriceValue, maxPriceValue]);

        if (category !== '') {
          setSelectedCategory(category);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    filterProducts();
  }, [
    priceOrder,
    selectedCategory,
    selectedSizes,
    productsData,
    minPrice,
    maxPrice,
    priceRange,
  ]);

  const filterProducts = () => {
    if (!productsData) return;
    let filtered = [...productsData];
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      );
    }
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }
    filtered = filtered.filter(
      (product) =>
        parseInt(product.price) >= priceRange[0] &&
        parseInt(product.price) <= priceRange[1]
    );
    filtered.sort((a: any, b: any) => {
      if (priceOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handlePriceOrderChange = () => {
    setPriceOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
  };

  const handleProductsPerRowChange = (value: string) => {
    setProductsPerRow(parseInt(value));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const productsPerPage = 3 * productsPerRow; // Adjust as needed
  const totalProducts = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const minPagesToShow = 3; // Adjust as needed

  const firstPage = 1;
  const lastPage = totalPages;
  let pagesToShow = [];

  if (totalPages <= minPagesToShow) {
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const pagesBeforeCurrent = currentPage - 1;
    const pagesAfterCurrent = currentPage + 1;

    if (currentPage <= pagesBeforeCurrent + 1) {
      pagesToShow = Array.from({ length: minPagesToShow - 1 }, (_, i) => i + 1);
      if (
        currentPage !== firstPage &&
        currentPage !== lastPage &&
        currentPage !== firstPage + 1
      ) {
        pagesToShow.push(currentPage);
        if (currentPage !== lastPage - 1) pagesToShow.push(pagesAfterCurrent);
      } else {
        if (currentPage !== firstPage && currentPage !== lastPage)
          pagesToShow.push(currentPage + 1);
      }
      pagesToShow.push(totalPages);
    } else if (currentPage >= totalPages - pagesAfterCurrent) {
      pagesToShow.push(1);
      pagesToShow.push('...');
      pagesToShow = pagesToShow.concat(
        Array.from(
          { length: minPagesToShow - 1 },
          (_, i) => totalPages - minPagesToShow + 2 + i
        )
      );
    } else {
      pagesToShow.push(1);
      pagesToShow.push('...');
      pagesToShow = pagesToShow.concat(
        Array.from(
          { length: minPagesToShow - 3 },
          (_, i) => currentPage - pagesBeforeCurrent + 1 + i
        )
      );
      pagesToShow.push('...');
      pagesToShow.push(totalPages);
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      background: 'none',
      boxShadow: 'none',
    }),
  };
  const options = [
    {
      value: '4',
      label: (
        <div className="flex justify-center w-full">
          <img src="/i4.svg" alt="row2" width={25} height={25} />
        </div>
      ),
    },
    {
      value: '3',
      label: (
        <div className="flex justify-center w-full">
          <img src="/i3.svg" alt="row2" width={25} height={25} />
        </div>
      ),
    },
    {
      value: '2',
      label: (
        <div className="flex justify-center w-full">
          <img src="/i2.svg" alt="row2" width={20} height={20} />
        </div>
      ),
    },
  ];

  const handleSizeChange = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const getAllSizes = (): string[] => {
    if (!productsData) return [];
    const allSizes: string[] = [];
    productsData.forEach((product) => {
      if (product.sizes.length > 0) {
        if (product.sizes[0] !== '') {
          product.sizes.forEach((size) => {
            if (!allSizes.includes(size)) {
              allSizes.push(size);
            }
          });
        }
      }
    });
    return allSizes;
  };

  const allSizes = getAllSizes();

  const handleSliderChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  if (!filteredProducts || !storeData) {
    return null;
  }

  return (
    <section className="w-full flex flex-col">
      <div
        className="filter flex w-full justify-between items-center md:pl-2 md:pr-3 px-4 py-5 mx-auto"
        style={{
          maxWidth: 316 * productsPerRow + 'px',
        }}
      >
        <p>{filteredProducts.length} Products</p>
        <div className="ml-[58px]">
          <Select
            styles={customStyles}
            options={options}
            onChange={(selectedOption) => {
              if (selectedOption) {
                handleProductsPerRowChange(selectedOption.value);
              }
            }}
            isSearchable={false}
            defaultValue={options.find((option) => option.value === '4')}
          />
        </div>
        <button onClick={handlePriceOrderChange}>
          Price: {priceOrder === 'asc' ? 'Low to High' : 'High to Low'}
        </button>
      </div>
      <div className="content flex lg:flex-row flex-col w-full gap-2 relative justify-center">
        <div
          className="categories px-2 flex flex-col gap-2 lg:absolute relative left-0  lg:w-[17%] w-full"
          ref={productsRef}
        >
          <div className="PriceFilter p-2 flex flex-col gap-2">
            <h2 className="font-serif text-3xl">Filter by Price</h2>
            <div className="w-[25%] h-[3px] bg-black/80 dark:bg-white -mt-2" />
            <div className=" mt-3 flex flex-col gap-1">
              <CustomSlider
                min={minPrice}
                max={maxPrice}
                step={10}
                values={priceRange}
                onChange={handleSliderChange}
                currency={storeData.currency}
              />
            </div>
          </div>
          <div className="category p-2 flex flex-col gap-2">
            <h2 className="font-serif text-3xl">Product Categories</h2>
            <div className="w-[25%] h-[3px] bg-black/80 dark:bg-white -mt-2" />
            <div>
              <button onClick={() => setSelectedCategory(null)}>All</button>
            </div>
            {Array.from(
              new Set(productsData?.map((product) => product.category) || [])
            ).map((category) => (
              <div key={category}>
                <button onClick={() => handleCategoryChange(category)}>
                  {category}
                </button>
              </div>
            ))}
          </div>
          <div className="sizes p-2 flex flex-col gap-2">
            <h2 className="font-serif text-3xl">Size</h2>
            <div className="w-[25%] h-[3px] bg-black/80 dark:bg-white -mt-2" />
            <div className="flex gap-2 flex-wrap ">
              {allSizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className="border-black/50 dark:border-white/60"
                  variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`products flex flex-wrap mx-auto gap-4 lg:justify-start justify-center`}
          style={{
            maxWidth: 312 * productsPerRow + 'px',

            minHeight: productsRef.current?.clientHeight + 'px',
          }}
        >
          {filteredProducts.length < 1 && (
            <div className="flex w-full h-full justify-center mt-24  text-2xl">
              No products
            </div>
          )}
          {filteredProducts
            ?.slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage
            )
            .map((product) => (
              <ProductCard
                product={product}
                storeData={storeData}
                key={product._id}
              />
            ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="pagination flex w-full justify-center p-4 mt-5 gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="font-semibold"
          >
            {'<'}
          </Button>
          {pagesToShow.map((page, index) => (
            <Button
              key={index}
              onClick={() =>
                handlePageChange(typeof page === 'number' ? page : currentPage)
              }
              className={currentPage === page ? 'active' : ''}
              variant={currentPage === page ? 'default' : 'outline'}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="font-semibold"
          >
            {'>'}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Products;
