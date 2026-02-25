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
    <div className="relative flex bg-white p-3 md:p-4 rounded-2xl gap-3 md:gap-6 border border-neutral-100 hover:border-orange-200 transition-all duration-300 group font-urbanist">



      {/* Image Section */}
      <div className="shrink-0 aspect-square w-[65px] md:w-[140px] bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center p-2 transition-colors">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="w-full flex flex-col justify-between py-1">
        <div className="space-y-1 md:space-y-2">
          <div className="space-y-1">
            <h3 className="text-base md:text-xl font-black text-black tracking-tight uppercase leading-tight">
              {item.title}
            </h3>


          </div>

          <div className="text-lg md:text-2xl font-black text-black tracking-tighter">
            ₹{(item.price * item.quantity).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Selector - Minimalist Pill */}
          <div className="flex items-center bg-neutral-100 rounded-lg p-1 border border-neutral-200">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-neutral-500 hover:text-black"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            <span className="w-10 text-center font-black text-black text-sm">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-neutral-500 hover:text-black"
            >
              <Plus size={14} strokeWidth={3} />
            </button>

            <div className="w-px h-4 bg-neutral-200 mx-1.5" />

            <button
              onClick={handleRemove}
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-all"
            >
              <Trash2 size={14} />
            </button>
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
