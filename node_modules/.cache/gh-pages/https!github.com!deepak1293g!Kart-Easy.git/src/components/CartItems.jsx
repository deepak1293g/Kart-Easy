import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = () => {
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src="p1.png" alt="product1" width={120} height={120} />
      </div>

      {/* DETAILS */}
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            Nike Shoe
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5]">
            MRP : &#8377;12345
          </div>
        </div>

        {/* PRODUCT SUBTITLE (shown only on md and above) */}
        <div className="text-sm md:text-md font-medium text-black/[0.5] mt-1 hidden md:block">
          Nike Shoe
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-sm md:text-md text-black/[0.5]">
            <span className="font-semibold">Quantity:</span>
            <select className="hover:text-black outline-none">
              {[...Array(7)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
