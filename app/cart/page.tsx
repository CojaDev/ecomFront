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
    if (cart.cartItems.length > 0) {
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
      <section className="flex gap-20 min-h-[75vh]  py-16 px-10 max-lg:flex-col max-sm:px-3">
        <div className="w-2/3 max-lg:w-full px-2  ">
          <p className="text-4xl font-serif">Shopping Cart</p>
          <hr className="my-6" />

          {cart.cartItems.length === 0 ? (
            <p className="text-2xl font-serif">No item in cart</p>
          ) : (
            <div className="gap-2 flex flex-col">
              {cart.cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="w-full flex border-b max-sm:flex-col max-sm:gap-3 hover:bg-gray-100/70 dark:hover:bg-gray-100/40 transition-all rounded-sm px-4 py-4 items-center max-sm:items-start justify-between"
                >
                  <div className="flex items-center">
                    <Image
                      src={cartItem.item.images[0]}
                      width={100}
                      height={100}
                      priority
                      draggable={false}
                      className="rounded-lg w-32 h-32 object-cover "
                      alt="product"
                    />
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-lg">{cartItem.item.name}</p>
                      {cartItem.color && (
                        <div className="flex items-center gap-1.5">
                          <p className="text-lg capitalize">Color:</p>
                          <div
                            className="w-5 h-5 rounded-full border border-black dark:border-white"
                            style={{
                              backgroundColor: getColorWithOpacity(
                                cartItem.color,
                                0.7
                              ),
                            }}
                          />
                        </div>
                      )}
                      {cartItem.size && (
                        <p className="text-lg">Size: {cartItem.size}</p>
                      )}
                      <p className="text-lg">
                        Price:{' '}
                        {parseInt(cartItem.item.price)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                        {storeData && storeData.currency}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center ">
                    <MinusCircle
                      className="hover:text-red-1 cursor-pointer hover:scale-110 transition-all"
                      onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                    />
                    <p className="text-body-bold text-lg">
                      {cartItem.quantity}
                    </p>
                    <PlusCircle
                      className="hover:text-red-1 cursor-pointer hover:scale-110 transition-all"
                      onClick={() => cart.increaseQuantity(cartItem.item._id)}
                    />
                    <Trash
                      className="hover:text-red-1 cursor-pointer hover:scale-110 transition-all mx-2"
                      onClick={() => cart.removeItem(cartItem.item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-1/3 max-lg:w-full flex flex-col gap-8 border-l px-5 py-5">
          <p className="text-heading4-bold pb-4">
            Summary{' '}
            <span>{`(${cart.cartItems.length} ${
              cart.cartItems.length > 1 ? 'items' : 'item'
            })`}</span>
          </p>
          <div className="flex justify-between text-body-semibold">
            <span>Total Amount</span>
            <span>
              {totalRounded.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
              {storeData && storeData.currency}
            </span>
          </div>
          <button
            className="border rounded-lg text-body-bold bg-white dark:bg-black/30 dark:hover:bg-white py-3 w-full hover:bg-black transition-all hover:text-white dark:text-white dark:hover:text-black"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
      <ProductList title="You Might Also Like" />
    </Layout>
  );
};

export default Cart;
