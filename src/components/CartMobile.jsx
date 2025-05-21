import React from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaCaretRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";

const CartMobile = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);

  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <div className="sticky bottom-4 p-3 lg:hidden">
      <div className="bg-green-800 px-2 py-3 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-700 rounded w-fit">
            <BsCart />
          </div>
          <div className="text-xs">
            <p>{cartItems.length} Items</p>
            <p>&#8377; {subTotal}</p>
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
