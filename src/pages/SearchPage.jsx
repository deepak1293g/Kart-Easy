import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import {
  Search,
  ChevronDown,
  MapPin,
  Filter,
  Menu,
  Star,
  Check,
  X,
  Plus
} from "lucide-react";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [searchInput, setSearchInput] = useState(query);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const observerTarget = useRef(null);

  // Derive Dynamic Filters from Results
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(results.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, [results]);

  const categories = useMemo(() => {
    const uniqueCats = [...new Set(results.map(p => p.category).filter(Boolean))];
    return uniqueCats.sort();
  }, [results]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = query
          ? `https://dummyjson.com/products/search?q=${query}`
          : `https://dummyjson.com/products?limit=100`;
        const res = await fetch(url);
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
    setSearchInput(query);
    setDisplayLimit(20); // Reset limit on new search
  }, [query]);

  // Apply Filtering Logic
  const filteredResults = useMemo(() => {
    return results.filter(product => {
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchRating = product.rating >= minRating;

      return matchBrand && matchCategory && matchRating;
    });
  }, [results, selectedBrands, selectedCategories, minRating]);

  // Reset limit when filters change
  useEffect(() => {
    setDisplayLimit(20);
  }, [selectedBrands, selectedCategories, minRating]);

  // Infinite Scroll Observer Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayLimit < filteredResults.length) {
          // Add a small delay for smoother feel if desired, but instant is usually better
          setDisplayLimit((prev) => prev + 20);
        }
      },
      { threshold: 0.1, rootMargin: "200px" } // Trigger slightly before reaching the bottom
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayLimit, filteredResults.length]);

  // Debounce search input for live results
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.trim() !== query) {
        navigate(`/search?query=${searchInput.trim()}`, { replace: true });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchInput, navigate, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Submission is handled by live search debounce, but keeping for accessibility
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinRating(0);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Brand Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Brand</h3>
          <ChevronDown size={12} className="text-neutral-500" />
        </div>
        <div className="space-y-3 max-h-[250px] overflow-y-auto no-scrollbar pr-2">
          {brands.length > 0 ? brands.map((brand, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? "bg-orange-600 border-orange-600" : "border-neutral-200 group-hover:border-neutral-400"}`}>
                {selectedBrands.includes(brand) && <Check size={12} className="text-white" strokeWidth={4} />}
              </div>
              <span className={`text-xs font-bold transition-colors ${selectedBrands.includes(brand) ? "text-black" : "text-neutral-500"}`}>{brand}</span>
            </label>
          )) : (
            <span className="text-[10px] text-neutral-400 uppercase italic">No brands found</span>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between cursor-pointer">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Category</h3>
          <ChevronDown size={12} className="text-neutral-500" />
        </div>
        <div className="space-y-3 max-h-[250px] overflow-y-auto no-scrollbar pr-2">
          {categories.length > 0 ? categories.map((cat, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleCategory(cat)}>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? "bg-orange-600 border-orange-600" : "border-neutral-200 group-hover:border-neutral-400"}`}>
                {selectedCategories.includes(cat) && <Check size={12} className="text-white" strokeWidth={4} />}
              </div>
              <span className={`text-xs font-bold transition-colors ${selectedCategories.includes(cat) ? "text-black" : "text-neutral-500"}`}>{cat}</span>
            </label>
          )) : (
            <span className="text-[10px] text-neutral-400 uppercase italic">No categories found</span>
          )}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Rating</h3>
          <ChevronDown size={12} className="text-neutral-500" />
        </div>
        <div className="space-y-3">
          {[4, 3, 2].map((stars) => (
            <label key={stars} className="flex items-center gap-3 cursor-pointer group" onClick={() => setMinRating(prev => prev === stars ? 0 : stars)}>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${minRating >= stars ? "bg-orange-600 border-orange-600" : "border-neutral-200 group-hover:border-neutral-400"}`}>
                {minRating >= stars && <Check size={12} className="text-white" strokeWidth={4} />}
              </div>
              <div className="flex items-center gap-1.5">
                <Star className={minRating >= stars ? "fill-orange-500 text-orange-500" : "text-neutral-300"} size={12} />
                <span className={`text-xs font-bold uppercase tracking-tight ${minRating >= stars ? "text-black" : "text-neutral-500"}`}>{stars} stars above</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-urbanist text-neutral-900 pb-10">

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
              <h2 className="text-xl font-black italic tracking-tighter uppercase">Filter</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-black active:scale-90 transition-all"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <FilterContent />
            </div>
            <div className="px-6 py-6 border-t border-neutral-100 flex gap-3">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFiltersOpen(false);
                }}
                className="flex-1 h-12 rounded-2xl border border-neutral-200 font-black text-[10px] uppercase tracking-widest text-neutral-500 hover:text-black hover:border-black transition-all"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 h-12 rounded-2xl bg-black text-white font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-black/10"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Header Section */}
      <header className="bg-white pt-6 pb-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Row - Search Only */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative w-full lg:flex-1">
              <form onSubmit={handleSearchSubmit} className="flex h-14 bg-neutral-100 rounded-2xl overflow-hidden">
                <div className="flex-1 flex items-stretch px-6 gap-3">
                  <div className="flex items-center gap-4 w-full">
                    <Search size={20} className="text-neutral-500" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search anything..."
                      className="w-full h-full bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-base font-bold placeholder:text-neutral-500 py-0"
                    />
                    {searchInput && (
                      <X
                        size={20}
                        className="text-neutral-300 hover:text-black cursor-pointer transition-colors"
                        onClick={() => setSearchInput("")}
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 py-6 flex gap-8">

        {/* Sidebar Filters */}
        <aside className="w-[280px] shrink-0 hidden lg:block space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black italic tracking-tighter uppercase">Filter</h2>
            <button onClick={clearAllFilters} className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:underline">Clear all</button>
          </div>

          {/* Active Filters Summary Pills */}
          <div className="flex flex-wrap gap-2">
            {selectedBrands.map(brand => (
              <div key={brand} className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-600 uppercase">{brand}</span>
                <X size={10} className="text-neutral-400 hover:text-black cursor-pointer" onClick={() => toggleBrand(brand)} />
              </div>
            ))}
            {selectedCategories.map(cat => (
              <div key={cat} className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-600 uppercase">{cat}</span>
                <X size={10} className="text-neutral-400 hover:text-black cursor-pointer" onClick={() => toggleCategory(cat)} />
              </div>
            ))}
          </div>

          <FilterContent />
        </aside>

        {/* Main Products Area */}
        <div className="flex-1 space-y-6">

          {/* Results Summary Info & Mobile Filter Trigger */}
          <div className="py-2 flex items-center justify-between">
            <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
              Showing {filteredResults.length} Products for <span className="text-orange-600 font-black italic">"{query || "All Products"}"</span>
            </p>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-black/10"
            >
              <Filter size={12} />
              Filter
            </button>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-neutral-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
              {filteredResults.slice(0, displayLimit).map((product) => (
                <ProductCard key={product.id} product={product} isSmall={true} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-6">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                <Search size={32} className="text-neutral-500" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter uppercase italic">No entities found</h3>
              <p className="text-neutral-500 text-sm max-w-xs mx-auto">Try re-initializing your search stream with different parameters.</p>
            </div>
          )}

          {/* Infinite Scroll Sentinel */}
          {filteredResults.length > displayLimit && (
            <div ref={observerTarget} className="flex justify-center py-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div >
  );
};

export default SearchPage;
