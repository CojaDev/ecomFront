'use client';
import Layout from '@/components/Layout';
import ProductList from '@/components/ProductList';

import useCart from '@/lib/useCart';

import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';

const Cart = () => {
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem: any) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const handleCheckout = async () => {
    console.log('Checkout');
  };

  return (
    <Layout>
      <section className="flex gap-20 min-h-[75vh] py-16 px-10 max-lg:flex-col max-sm:px-3">
        <div className="w-2/3 max-lg:w-full">
          <p className="text-4xl font-serif">Shopping Cart</p>
          <hr className="my-6" />

          {cart.cartItems.length === 0 ? (
            <p className="text-body-bold text-2xl font-serif">
              No item in cart
            </p>
          ) : (
            <div>
              {cart.cartItems.map((cartItem) => (
                <div className="w-full flex border-b max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-4 items-center max-sm:items-start justify-between">
                  <div className="flex items-center">
                    <Image
                      src={cartItem.item.images[0]}
                      width={100}
                      height={100}
                      className="rounded-lg w-32 h-32 object-cover"
                      alt="product"
                    />
                    <div className="flex flex-col gap-3 ml-4">
                      <p className="text-body-bold">{cartItem.item.title}</p>
                      {cartItem.color && (
                        <p className="text-small-medium capitalize">
                          {cartItem.color}
                        </p>
                      )}
                      {cartItem.size && (
                        <p className="text-small-medium">{cartItem.size}</p>
                      )}
                      <p className="text-small-medium">
                        ${cartItem.item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
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
                  </div>

                  <Trash
                    className="hover:text-red-1 cursor-pointer hover:scale-110 transition-all"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
          <p className="text-heading4-bold pb-4">
            Summary{' '}
            <span>{`(${cart.cartItems.length} ${
              cart.cartItems.length > 1 ? 'items' : 'item'
            })`}</span>
          </p>
          <div className="flex justify-between text-body-semibold">
            <span>Total Amount</span>
            <span>$ {totalRounded}</span>
          </div>
          <button
            className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black transition-all hover:text-white"
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
