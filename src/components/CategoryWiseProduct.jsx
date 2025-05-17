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
        // Step 1: Fetch the total number of products
        const countRes = await fetch("https://dummyjson.com/products");
        const countData = await countRes.json();
        const total = countData.total || 100; // Fallback to 100 if not found

        // Step 2: Fetch all products using the total count
        const res = await fetch(
          `https://dummyjson.com/products?limit=${total}`
        );
        const data = await res.json();

        // Step 3: Group products by category
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

  console.log(productsByCategory);

  const handleScroll = (containerId, direction) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollLeft += direction === "right" ? 300 : -300;
    }
  };

  return (
    <div className="py-10">
      {Object.entries(productsByCategory).map(([category, products], index) => {
        const scrollContainerId = `scroll-container-${index}`;

        return (
          <div key={category} className="mb-10">
            <div className="container mx-auto p-4 flex items-center justify-between gap-4">
              <h3 className="font-semibold text-xl md:text-2xl capitalize">
                {category}
              </h3>
              <Link
                to={`/category/${category}`}
                className="text-green-600 hover:text-green-800 text-lg font-semibold md:text-xl"
              >
                See All
              </Link>
            </div>

            <div className="relative">
              <div
                id={scrollContainerId}
                className="scrollbar-hide flex gap-4 sm:gap-2 md:gap-4 lg:gap-6 container mx-auto overflow-x-auto scrollbar-none scroll-smooth flex-nowrap"
              >
                {loading
                  ? loadingCardNumber.map((_, i) => (
                      <div
                        key={`loading-${category}-${i}`}
                        className="flex-shrink-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/6"
                      >
                        <CardLoading />
                      </div>
                    ))
                  : products.map((product) => (
                      <div
                        key={product.id}
                        className="flex-shrink-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/6"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
              </div>

              {/* Scroll Buttons */}
              <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between items-center top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => handleScroll(scrollContainerId, "left")}
                  className="z-10 bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={() => handleScroll(scrollContainerId, "right")}
                  className="z-10 bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
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
