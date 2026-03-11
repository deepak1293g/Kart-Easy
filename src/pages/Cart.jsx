import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "@/components/CartItems";
import {
  ShoppingBag, ArrowRight, ChevronRight, Check, Tag, Gift, Info, X
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
  }, [cartItems]);

  // Pricing Logic: 1% Discount, ₹40 shipping if < ₹1000
  const discountAmount = subTotal * 0.01;
  const shippingCost = subTotal > 1000 ? 0 : 40;
  const finalTotal = subTotal - discountAmount + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-6 sm:p-10 font-urbanist">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6 sm:mb-8 text-neutral-500">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tighter uppercase italic mb-3 sm:mb-4">Your Bag is Empty</h3>
        <p className="text-neutral-500 mb-6 sm:mb-8 max-w-xs font-medium text-sm sm:text-base px-4 sm:px-0">Add some items to start your premium shopping experience.</p>
        <Link
          to="/"
          className="bg-black text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-2xl shadow-neutral-200 flex items-center gap-3 text-sm sm:text-base"
        >
          <ShoppingBag size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
          Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-urbanist text-neutral-900 pb-20 overflow-x-hidden">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-12 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-10 relative z-10">

        <div className="flex-[1.6] space-y-6 md:space-y-8">
          <h1 className="text-[28px] sm:text-3xl md:text-3xl font-black tracking-tighter uppercase italic text-black">
            Your <span className="text-orange-600">Cart</span>
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="flex-1 space-y-6 sm:space-y-8">
          <div className="space-y-4 md:space-y-4">
            <h4 className="text-[10px] sm:text-sm md:text-xs font-black uppercase tracking-[0.2em] text-black">Price Details</h4>
            <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-10 border border-neutral-100 shadow-sm space-y-5 md:space-y-6">
              <div className="space-y-4 border-b border-neutral-50 pb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs sm:text-base md:text-sm font-medium gap-6">
                    <span className="text-neutral-500 leading-tight">
                      {item.quantity} x {item.title}
                    </span>
                    <span className="font-black shrink-0 text-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-xs sm:text-base md:text-sm font-medium">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-black text-black">₹{subTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-base md:text-sm font-medium">
                  <span className="text-neutral-500">Coupon discount</span>
                  <span className="text-emerald-600 font-black">-₹{discountAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-base md:text-sm font-medium">
                  <span className="text-neutral-500">Delivery Charges</span>
                  <span className="text-emerald-600 font-black uppercase tracking-widest text-[10px] sm:text-xs md:text-[10px]">
                    {shippingCost === 0 ? "Free Delivery" : `₹${shippingCost}`}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-dashed border-neutral-100 flex justify-between items-baseline">
                <span className="text-lg sm:text-xl md:text-lg font-black uppercase tracking-tighter italic text-black">Total Amount</span>
                <span className="text-3xl sm:text-4xl md:text-4xl font-black tracking-tighter text-black">₹{finalTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 sm:py-6 md:py-5 rounded-2xl font-black text-sm sm:text-lg md:text-base uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-2xl shadow-neutral-200 mt-4 flex items-center justify-center gap-3 group"
              >
                Place order
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
