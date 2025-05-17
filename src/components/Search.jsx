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
    <div className="w-full min-w-[300px] lg:min-w-[600px] h-12 rounded-lg border overflow-hidden flex items-center justify-between">
      <div className="font-medium w-full h-full flex items-center justify-between pl-3 text-lg">
        {!isSearchPage ? (
          <div
            className="vertical-typing-container"
            onClick={redirectToSearchPage}
          >
            <TypeAnimation
              sequence={[
                'Search for "milk"',
                1000,
                'Search for "chocolate"',
                1000,
                'Search for "chips"',
                1000,
                'Search for "kurkure"',
                1000,
                'Search for "cookies"',
                1000,
                'Search for "sweets"',
                1000,
                'Search for "candy"',
                1000,
                'Search for "dairy products"',
                1000,
                'Search for "fruits"',
                1000,
              ]}
              wrapper="span"
              speed={150}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="flex items-center gap-1 w-full">
            <Link
              to={"/"}
              className="h-full p-3 pr-3 flex items-center justify-center"
            >
              <BsArrowLeft size={20} />
            </Link>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full h-full border-none outline-none"
              autoFocus={true}
              value={query}
              onChange={handleOnChange}
            />
          </div>
        )}
        <button className="h-full p-3 pr-3 flex items-center justify-center">
          <BsSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Search;
