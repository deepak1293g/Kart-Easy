import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CardLoading from "./CardLoading";
import ProductCard from "./ProductCard";

import "../../src/index.css";


const CategoryWiseProduct = () => {
  const [loading, setLoading] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState({});
  const loadingCardNumber = new Array(6).fill(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const countRes = await fetch("https://dummyjson.com/products");
        const countData = await countRes.json();
        const total = countData.total || 100;

        const res = await fetch(`https://dummyjson.com/products?limit=${total}`);
        const data = await res.json();

        const grouped = data.products.reduce((acc, product) => {
          if (!acc[product.category]) acc[product.category] = [];
          acc[product.category].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleScroll = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollLeft += direction === "right" ? 400 : -400;
    }
  };

  return (
    <div className="space-y-1">
      {Object.entries(productsByCategory).map(([category, products], index) => {
        const scrollContainerId = `scroll-container-${index}`;

        return (
          <div
            key={category}
            className={`py-2 md:py-4 rounded-[3rem] transition-all duration-500 overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
          >
            <div className="px-4 md:px-6 lg:px-8 flex items-end justify-between gap-4 mb-3 md:mb-6">
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="h-1 w-6 md:h-1.5 md:w-8 bg-orange-600 rounded-full"></div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Exclusive</span>
                </div>
                <h3 className="font-black text-xl md:text-5xl capitalize text-gray-900 tracking-tight">
                  {category.replace("-", " ")}
                </h3>
              </div>
              <Link
                to={`/category/${category}`}
                className="group flex items-center gap-2 md:gap-3 bg-white border-2 border-gray-900/5 px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-base font-black shadow-sm hover:bg-black hover:text-white hover:border-black transition-all active:scale-95"
              >
                <span>View</span>
                <FaAngleRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative group/container px-4 md:px-6 lg:px-8 pt-4">
              <div
                id={scrollContainerId}
                className="scrollbar-hide flex gap-4 md:gap-8 w-full overflow-x-auto scrollbar-none scroll-smooth flex-nowrap pb-10"
              >
                {loading
                  ? loadingCardNumber.map((_, i) => (
                    <div
                      key={`loading-${category}-${i}`}
                      className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[14%]"
                    >
                      <CardLoading />
                    </div>
                  ))
                  : products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[14%]"
                    >
                      <ProductCard product={product} isSmall={true} />
                    </div>
                  ))}
              </div>

              {/* Scroll Buttons - Repositioned and stylized */}
              <div className="absolute inset-y-0 left-0 right-0 hidden xl:flex items-center justify-between pointer-events-none px-4 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 -translate-y-5">
                <button
                  onClick={() => handleScroll(scrollContainerId, "left")}
                  className="pointer-events-auto bg-white hover:bg-black hover:text-white shadow-2xl text-xl p-5 rounded-2xl border border-gray-100 transition-all active:scale-90"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={() => handleScroll(scrollContainerId, "right")}
                  className="pointer-events-auto bg-white hover:bg-black hover:text-white shadow-2xl text-xl p-5 rounded-2xl border border-gray-100 transition-all active:scale-90"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryWiseProduct;

