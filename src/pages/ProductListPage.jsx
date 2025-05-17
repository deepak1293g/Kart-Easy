import CardLoading from "@/components/CardLoading";
import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

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

        setProducts(grouped);
        setCategories(Object.keys(grouped)); // Set categories after grouping
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products[selectedCategory] || [] // If category selected, get the products for that category
    : Object.values(products).flat(); // Flatten all products if no category is selected

  return (
    <div className="w-full md:py-10">
      <Wrapper>
        <div className="grid grid-cols-[250px_1fr] h-screen">
          {/* Left: Category List */}
          <div className="bg-gray-100 p-4 overflow-y-auto border-r max-h-screen">
            <h2 className="text-lg font-bold mb-3">Categories</h2>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`block w-full text-left px-3 py-2 mb-1 rounded cursor-pointer ${
                  selectedCategory === category
                    ? "bg-gray-300 text-black"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-5 capitalize">
                  {category}
                </div>
              </button>
            ))}
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-3 text-sm text-black underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          {/* Right: Product List */}
          <div className="p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 capitalize">
              {selectedCategory ? selectedCategory : "All Products"}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CardLoading key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    state={{ product }}
                    to={`/productdetails/${product.id}`}
                    className="border rounded p-4 hover:shadow transition"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-40 object-contain rounded mb-2"
                    />
                    <h3 className="font-semibold text-md">{product.title}</h3>
                    <p className="text-gray-500 text-md capitalize">
                      {product.category}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductListPage;
