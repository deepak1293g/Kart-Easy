import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link
      to={`/productdetails/${product.id}`}
      state={{ product }}
      className="transform overflow-hidden bg-white duration-200 hover:scale-110 cursor-pointer"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        width={500}
        height={500}
        className="w-full h-auto object-cover"
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{product.title}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">₹{product.price}</p>
          <p className="line-through">₹{Math.round(product.price * 1.2)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
