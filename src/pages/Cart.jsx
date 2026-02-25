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
      <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-10 font-urbanist">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-8 text-neutral-500">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic mb-4">Your Bag is Empty</h3>
        <p className="text-neutral-500 mb-8 max-w-xs font-medium">Add some items to start your premium shopping experience.</p>
        <Link
          to="/"
          className="bg-black text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-2xl shadow-neutral-200 flex items-center gap-3"
        >
          <ShoppingBag size={20} />
          Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-urbanist text-neutral-900 pb-20 overflow-x-hidden">

      <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-20 flex flex-col lg:flex-row gap-10 md:gap-16 relative z-10">

        <div className="flex-[1.6] space-y-8 md:space-y-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-black">
            Your <span className="text-orange-600">Cart</span>
          </h1>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="flex-1 space-y-8">



          {/* Price Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Price Details</h4>
            <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm space-y-5">
              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar border-b border-neutral-50 pb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm font-medium gap-4">
                    <span className="text-neutral-600 leading-tight">
                      {item.quantity} x {item.title}
                    </span>
                    <span className="font-black shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm font-medium pt-2">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-black">₹{subTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-neutral-600">Coupon discount</span>
                <span className="text-emerald-600 font-black">-₹{discountAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-medium pb-2">
                <span className="text-neutral-600">Delivery Charges</span>
                <span className="text-emerald-600 font-black uppercase tracking-widest text-xs">
                  {shippingCost === 0 ? "Free Delivery" : `₹${shippingCost}`}
                </span>
              </div>

              <div className="pt-6 border-t-2 border-dashed border-neutral-100 flex justify-between items-baseline">
                <span className="text-lg font-black uppercase tracking-tighter italic">Total Amount</span>
                <span className="text-3xl font-black tracking-tighter text-black">₹{finalTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black hover:bg-neutral-800 text-white py-4 md:py-6 rounded-2xl font-black text-base md:text-lg uppercase tracking-[0.2em] transition-all shadow-2xl shadow-neutral-300 mt-6 flex items-center justify-center gap-4 group"
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
