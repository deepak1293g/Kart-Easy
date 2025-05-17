import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaCaretRight } from "react-icons/fa";

const CartMobile = () => {
  return (
    <div className="sticky bottom-4 p-2 lg:hidden">
      <div className="bg-green-800 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-700 rounded w-fit">
            <BsCart />
          </div>
          <div className="text-xs">
            <p>3 items</p>
            <p>&#8377; 12345</p>
          </div>
        </div>

        <Link to={"/cart"} className="flex items-center gap-1">
          <span className="text-sm">View Cart</span>
          <FaCaretRight />
        </Link>
      </div>
    </div>
  );
};

export default CartMobile;
