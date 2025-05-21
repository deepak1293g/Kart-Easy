import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.error("Product removed from cart");
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={item.thumbnail} alt={item.title} width={120} height={120} />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item.title}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5]">
            ₹ {item.price}
          </div>
        </div>

        <div className="text-sm md:text-md font-medium text-black/[0.5] mt-1 hidden md:block">
          {item.brand}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-sm md:text-md text-black/[0.5]">
            <span className="font-semibold">Quantity:</span>
            <select
              value={item.quantity}
              onChange={handleQuantityChange}
              className="hover:text-black outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
