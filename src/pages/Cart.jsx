import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "@/components/Wrapper";
import { Link } from "react-router-dom";
import CartItem from "@/components/CartItems";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);

  console.log(cartItems);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.price;
      const quantity = item.quantity;

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS */}
              <div className="flex-[2]">
                <div className="text-lg font-bold mb-4">Cart Items</div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* SUMMARY */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      ₹ {subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON */}
                <button className="w-full py-4 rounded-full bg-black cursor-pointer text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
                  Checkout
                  {loading && <img src="/spinner.svg" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          // Empty Cart State
          <div className="flex-[2] flex flex-col items-center pb-[50px]">
            <img src="/empty-cart.jpg" width={300} height={300} />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
            </span>
            <Link
              to="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
