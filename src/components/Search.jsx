import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import debounce from "lodash/debounce"; // You'll need lodash for debouncing, or you can implement it manually

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // To redirect user to search page
  const redirectToSearchPage = () => {
    navigate("/search");
  };

  // Update the state based on current path
  useEffect(() => {
    if (location.pathname === "/search") {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [location]);

  // Debounced search handler
  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = debounce((query) => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  }, 500); // 500ms debounce

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="w-full min-w-[320px] lg:w-[500px] h-12 lg:h-14 rounded-2xl border border-gray-100 bg-gray-50/50 backdrop-blur-xl focus-within:bg-white focus-within:ring-8 focus-within:ring-black/5 focus-within:border-black transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-black/5 flex items-center justify-between group overflow-hidden">
      <div className="font-medium w-full h-full flex items-center justify-between text-base">
        {!isSearchPage ? (
          <div
            className="w-full h-full flex items-center px-5 cursor-pointer text-gray-400 hover:text-black transition-all duration-300"
            onClick={redirectToSearchPage}
          >
            <div className="flex items-center gap-4 w-full">
              <BsSearch className="text-neutral-500 group-hover:text-black transition-colors shrink-0" size={18} />
              <div className="flex-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-black truncate">
                <TypeAnimation
                  sequence={[
                    'Search Nexus: Premium Audio',
                    2000,
                    'Search Nexus: Elite Tech',
                    2000,
                    'Search Nexus: Masterpiece Art',
                    2000,
                  ]}
                  wrapper="span"
                  speed={150}
                  repeat={Infinity}
                />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-black/5 px-2.5 py-1.5 rounded-xl border border-black/5 group-hover:bg-black group-hover:text-white transition-all">
                <span className="text-[9px] font-black tracking-widest">COMMAND K</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full h-full">
            <Link
              to={"/"}
              className="h-full px-5 flex items-center justify-center hover:bg-black hover:text-white transition-all text-neutral-500 border-r border-gray-100"
            >
              <BsArrowLeft size={20} />
            </Link>
            <div className="flex-1 relative flex items-center pl-4">
              <input
                type="text"
                placeholder="Initialize search sequence..."
                className="w-full h-full border-none outline-none bg-transparent placeholder:text-neutral-500 text-black font-black py-3 text-sm uppercase tracking-wider"
                autoFocus={true}
                value={query}
                onChange={handleOnChange}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 p-1.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-neutral-500 transition-all active:scale-90"
                >
                  <span className="text-sm leading-none font-bold">ESC</span>
                </button>
              )}
            </div>
            <div className="h-full px-6 flex items-center justify-center text-neutral-500 group-focus-within:text-black transition-colors">
              <BsSearch size={18} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
