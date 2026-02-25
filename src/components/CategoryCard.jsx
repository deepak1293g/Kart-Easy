import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CategoryCard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((categories) => setCategories(categories))
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  return (
    <>
      {categories.map((category) => (
        <Link
          to={`/category/${category.slug}`}
          key={category.slug}
          className="transform overflow-hidden bg-white duration-300 hover:scale-105 hover:shadow-xl cursor-pointer transition-all ease-in-out rounded-lg"
        >
          <img
            src="/p1.png"
            alt={category.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="p-4 text-black/[0.9]">
            <h2 className="text-lg font-medium text-center">{category.name}</h2>
          </div>
        </Link>
      ))}
    </>
  );
}

export default CategoryCard;
