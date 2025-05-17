import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { CircleUserRound } from "lucide-react";
import useMobile from "../hooks/useMobile";
import { BsCart } from "react-icons/bs";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const isSearchPage = location.pathname === "/search";

  const handleUserClick = () => {
    if (user?._id) {
      navigate("/my-account");
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <Link to="/" className="h-full flex items-center">
            <img
              src={logo}
              width={220}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={170}
              height={60}
              alt="logo"
              className="lg:hidden"
            />
          </Link>

          <div className="hidden lg:block">
            <Search />
          </div>

          <div className="items-center gap-10">
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleUserClick}
            >
              <CircleUserRound size={26} className="cursor-pointer" />
            </button>

            <div className="hidden lg:flex items-center gap-10">
              <button className="text-neutral-600" onClick={handleUserClick}>
                <CircleUserRound size={30} className="cursor-pointer" />
              </button>

              <button
                className="cursor-pointer flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
                onClick={handleCartClick}
              >
                <div className="animate-bounce">
                  <BsCart size={30} />
                </div>
                <div className="font-semibold text-sm">
                  <p>Items</p>
                  <p>Price</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
