'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getStore } from '@/lib/action';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ProductCard from './ProductCard';

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
  const [productsPerRow, setProductsPerRow] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const store = await getStore();
        setProductsData(products);
        setFilteredProducts(products);
        setStoreData(store);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [priceOrder, selectedCategory, productsData]);

  const filterProducts = () => {
    if (!productsData) return;
    let filtered = [...productsData];
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    filtered.sort((a, b) => {
      if (priceOrder === 'asc') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return parseFloat(b.price) - parseFloat(a.price);
      }
    });
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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

  const productsPerPage = 12; // Adjust as needed
  const totalProducts = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

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

  if (!filteredProducts || !storeData) {
    return null;
  }

  return (
    <section className="w-full flex flex-col">
      <div
        className="filter flex w-full justify-between items-center pl-0 pr-4 py-5 mx-auto"
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
      <div className="content flex md:flex-row flex-col w-full gap-2 relative justify-center">
        <div className="category p-2 flex flex-col gap-2 md:absolute relative left-0 ">
          <h2 className="font-serif text-3xl">Categories</h2>
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
        <div
          className={`products flex flex-wrap mx-auto gap-4 md:justify-start justify-center`}
          style={{ maxWidth: 312 * productsPerRow + 'px' }}
        >
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
      <div className="pagination flex w-full justify-center p-4 mt-5 gap-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </Button>
      </div>
    </section>
  );
};

export default Products;
