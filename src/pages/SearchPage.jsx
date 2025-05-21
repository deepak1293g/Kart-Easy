import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import { useLocation, Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const fetchProducts = async (url, setState) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setState(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setState([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search results or default products
  useEffect(() => {
    if (query) {
      fetchProducts(
        `https://dummyjson.com/products/search?q=${query}`,
        setResults
      );
    } else {
      fetchProducts("https://dummyjson.com/products", setDefaultProducts);
    }
  }, [query]);

  return (
    <div className="py-10">
      <Wrapper>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : query ? (
          <>
            {/* <h1 className="text-xl mb-4">Search Results for "{query}"</h1> */}
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/productdetails/${product.id}`}
                    state={{ product }}
                    className="block"
                  >
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-lg text-center">
                No products found for "{query}".
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-xl mb-4">Featured Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {defaultProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/productdetails/${product.id}`}
                  state={{ product }}
                  className="block"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default SearchPage;
