import CardLoading from "@/components/CardLoading";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import useMobile from "@/hooks/useMobile";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductListPage = () => {
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [isMobile] = useMobile(); // Use the custom hook

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

        // If query param id is present (e.g. from URL /category/beauty), set it as selected
        if (id && grouped[id]) {
          setSelectedCategory(id);
        } else if (id === 'all') { // Only set 'all' if explicitly requested
          setSelectedCategory('all');
        } else {
          setSelectedCategory(null); // Default to nothing selected (Collapsed)
        }

        // On mobile, if no category is selected, maybe select the first one?
        // Or keep it closed. Let's keep it closed or follow normal logic.

      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Desktop/Tablet Filter Logic
  const filteredProducts = (selectedCategory && selectedCategory !== 'all')
    ? products[selectedCategory] || []
    : Object.values(products).flat();

  // Mobile Accordion Toggle Logic
  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Close if already open (Set to null)
    } else {
      setSelectedCategory(category); // Open new
    }
  };

  if (isMobile) {
    // --- Mobile Layout (Accordion) ---
    return (
      <div className="w-full py-4 bg-[#f9f9f9] min-h-screen">
        <div className="px-4 md:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="space-y-3">
            {/* All Products Option */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleCategory('all')}
                className={`w-full flex items-center justify-between p-4 text-left font-medium ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
              >
                <span>All Products</span>
                {selectedCategory === 'all' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {selectedCategory === 'all' && (
                <div className="p-4 border-t bg-gray-50">
                  {loading ? (
                    <div className="grid grid-cols-2 gap-2">
                      <CardLoading /> <CardLoading />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(products).flat().slice(0, 20).map(product => (
                        <ProductCard key={product.id} product={product} isSmall={true} />
                      ))}
                      <div className="col-span-2 text-center text-sm text-gray-500 py-2">Showing all products...</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {categories.map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between p-4 text-left font-medium capitalize ${selectedCategory === category ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                >
                  <span>{category}</span>
                  {selectedCategory === category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {/* Accordion Content */}
                {selectedCategory === category && (
                  <div className="p-4 border-t bg-gray-50">
                    {loading ? (
                      <div className="grid grid-cols-2 gap-2">
                        <CardLoading />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {products[category]?.map((product) => (
                          <ProductCard key={product.id} product={product} isSmall={true} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Desktop/Tablet Layout ---
  return (
    <div className="w-full md:py-10 bg-[#f9f9f9] min-h-screen">
      <div className="px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Left: Category List (Sticky Sidebar) */}
          <div className="w-full md:w-[250px] flex-shrink-0 hidden md:block">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
              <h2 className="text-xl font-bold mb-5 border-b pb-3">Categories</h2>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium capitalize flex items-center justify-between group ${(selectedCategory === 'all' || !selectedCategory)
                    ? "bg-black text-white hover:bg-neutral-800"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium capitalize flex items-center justify-between group ${selectedCategory === category
                      ? "bg-black text-white hover:bg-neutral-800 shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                  >
                    {category}
                    {selectedCategory === category && <span className="text-xs">●</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product List */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold capitalize">
                {(selectedCategory && selectedCategory !== 'all') ? `${selectedCategory} (${filteredProducts.length})` : `All Products (${filteredProducts.length})`}
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
                {Array.from({ length: 16 }).map((_, index) => (
                  <CardLoading key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                <p className="text-xl text-gray-500 font-medium">No products found.</p>
                <button onClick={() => setSelectedCategory('all')} className="mt-4 text-blue-600 font-medium hover:underline">
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
