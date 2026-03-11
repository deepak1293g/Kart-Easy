import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import { Minus, Plus, Trash2, Truck, Clock } from "lucide-react";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.error("Product removed from bag");
  };

  return (
    <div className="relative flex bg-white p-2.5 sm:p-5 md:p-4 rounded-2xl sm:rounded-3xl gap-4 sm:gap-8 border border-neutral-100 hover:border-neutral-200 transition-all duration-300 group font-urbanist">
      {/* Image Section */}
      <div className="shrink-0 aspect-square w-[70px] sm:w-[120px] md:w-[80px] bg-neutral-50 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-2 transition-colors">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between py-0.5 sm:py-1">
        <div className="space-y-1 md:space-y-1">
          <h3 className="text-[12px] sm:text-lg md:text-lg font-black text-black tracking-tight uppercase leading-tight line-clamp-1">
            {item.title}
          </h3>
        </div>

        <div className="flex flex-row items-center justify-between gap-2 mt-auto flex-nowrap">
          <div className="text-[11px] sm:text-lg md:text-xl font-bold text-black tracking-tighter shrink-0">
            ₹{item.price.toLocaleString()}
          </div>

          <div className="flex items-center">
            {/* Quantity Selector - Refined Pill */}
            <div className="inline-flex items-center bg-white rounded-lg border border-neutral-100 p-0.5 sm:p-1 shadow-sm">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="w-5 h-5 sm:w-8 sm:h-8 rounded-md flex items-center justify-center hover:bg-neutral-50 transition-all text-neutral-400 hover:text-black"
              >
                <Minus size={8} sm:size={14} strokeWidth={3} />
              </button>
              <span className="w-5 sm:w-10 text-center font-bold text-black text-[9px] sm:text-sm">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="w-5 h-5 sm:w-8 sm:h-8 rounded-md flex items-center justify-center hover:bg-neutral-50 transition-all text-neutral-400 hover:text-black"
              >
                <Plus size={8} sm:size={14} strokeWidth={3} />
              </button>

              <div className="w-px h-2.5 sm:h-4 bg-neutral-100 mx-0.5 sm:mx-1" />

              <button
                onClick={handleRemove}
                className="w-5 h-5 sm:w-8 sm:h-8 rounded-md flex items-center justify-center hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-all"
              >
                <Trash2 size={8} sm:size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default CartItem;
