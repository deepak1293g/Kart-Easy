import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Star, MapPin, ShoppingCart } from "lucide-react";


function ProductCard({ product, isSmall, noY = true }) {
  if (!product) return null;

  // Mock data for new UI elements if not present in API
  const rating = product.rating || 4.5;
  const reviews = Math.floor(Math.random() * 5000) + 100;
  const location = product.brand || "Elite Store";
  const city = "Jakarta Center";
  const soldCount = Math.floor(Math.random() * 8000) + 500;

  return (
    <ScrollReveal noY={noY} className="h-full">
      <Link
        to={`/productdetails/${product.id}`}
        state={{ product }}
        className={`group relative flex flex-col h-full bg-white rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden font-urbanist`}
      >
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-orange-600 shadow-sm px-2 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
            {product.discountPercentage ? `${Math.round(product.discountPercentage)}% Off` : 'New'}
          </span>
        </div>

        {/* Thumbnail Section */}
        <div className={`w-full aspect-square relative overflow-hidden bg-white flex items-center justify-center ${isSmall ? "p-2.5 md:p-4" : "p-8"} transition-colors group-hover:bg-neutral-50`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
          />

        </div>

        {/* Info Section */}
        <div className={`${isSmall ? "p-2.5 md:p-4" : "p-6"} flex flex-col flex-1 space-y-2 md:space-y-3`}>
          <div className="space-y-1">
            <h2 className={`${isSmall ? "text-[10px] md:text-sm" : "text-sm md:text-base"} font-black text-black line-clamp-2 leading-tight uppercase tracking-tight group-hover:text-orange-600 transition-colors`}>
              {product.title}
            </h2>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className={i < Math.floor(rating) ? "fill-orange-500 text-orange-500" : "text-neutral-300"}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 hidden sm:inline">{reviews} Reviews</span>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {/* Location & Store - Hidden on ultra small */}
            <div className="flex items-center gap-1.5 text-neutral-500 overflow-hidden">
              <MapPin size={10} strokeWidth={3} className="shrink-0" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-tighter truncate">{location} | {city}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className={`${isSmall ? "text-sm md:text-lg" : "text-xl"} font-black text-black`}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-500 line-through">
                    ₹{Math.round(product.price * 1.25).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">{soldCount} sold</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <ArrowRight size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default ProductCard;
