'use client';
import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';
import { getStore } from '@/lib/action';
import tinycolor from 'tinycolor2';
import useCart from '@/lib/useCart';
import axios from 'axios';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import HeaderStore from '@/components/HeaderStore';

interface StoreData {
  currency: string;
}
const Cart = () => {
  const cart = useCart();

  const getColorWithOpacity = (colorName: string, opacity: number) => {
    const color = tinycolor(colorName);
    return color.setAlpha(opacity).toRgbString();
  };

  const total = cart.cartItems.reduce(
    (acc, cartItem: any) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const handleCheckout = async () => {
    try {
      await axios
        .post('/api/checkout', { cartItems: cart.cartItems })
        .then((res: any) => {
          cart.clearCart();
          const { data } = res;
          console.log(data);
          window.location.href = data.url;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const store = await getStore();
        setStoreData(store);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!cart) {
    return (
      <Layout>
        <div className="w-full h-[85vh] flex justify-center items-center">
          <h2 className="text-8xl font-serif">Loading...</h2>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <HeaderStore title="Payment Success" />
      <ProductList title="You Might Also Like" />
    </Layout>
  );
};

export default Cart;
