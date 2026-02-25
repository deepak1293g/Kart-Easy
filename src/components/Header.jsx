import React from "react";
import { useState, useMemo } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { CircleUserRound, LogOut, User, ShoppingBag, ChevronDown } from "lucide-react";
import useMobile from "../hooks/useMobile";
import { BsCart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import authService from "../utils/authService";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { pathname } = location;
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";
  const isSearchPage = pathname === "/search";
  const isCartPage = pathname === "/cart";
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";

  const shouldHideSearchAndCart =
    isLogin ||
    isRegister ||
    isSearchPage ||
    isCartPage ||
    isContactPage ||
    isAboutPage ||
    pathname === "/forgot-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password" ||
    pathname === "/edit-profile" ||
    pathname === "/my-orders" ||
    pathname === "/success" ||
    matchPath("/order-details/:id", pathname);

  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown on navigation
  React.useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    setShowDropdown(false);
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <header className="h-auto py-2 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
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

        {!shouldHideSearchAndCart && (
          <div className="hidden lg:block">
            <Search />
          </div>
        )}

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Cart Icon - Only show if logged in */}
          {!shouldHideSearchAndCart && user && !isCartPage && !isAboutPage && !isContactPage && (
            <button
              className="relative cursor-pointer flex items-center justify-center p-2 text-neutral-600 hover:text-black transition-colors"
              onClick={handleCartClick}
            >
              <BsCart size={26} className="lg:hidden" />
              <BsCart size={28} className="hidden lg:block" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 lg:-top-1 lg:right-1 bg-red-600 text-white text-[9px] lg:text-[10px] font-bold w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}

          {/* Hide login/profile on auth, contact and about pages */}
          {!isContactPage && !isAboutPage && !isLogin && !isRegister && pathname !== "/forgot-password" && (
            user ? (
              <div className="relative">
                <button
                  className="flex items-center gap-3 cursor-pointer group p-1 pr-2 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-neutral-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown((prev) => !prev);
                  }}
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-indigo-50 to-purple-50 flex items-center justify-center border border-neutral-200 overflow-hidden group-hover:shadow-md transition-all">
                    {user.profilePic ? (
                      <img src={user.profilePic} className="w-full h-full object-cover" alt="profile" />
                    ) : (
                      <CircleUserRound size={24} className="text-neutral-500" />
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-neutral-100 shadow-xl rounded-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in duration-200"
                  >
                    <Link
                      to="/edit-profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={18} />
                      Edit Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <ShoppingBag size={18} />
                      My Orders
                    </Link>
                    <div className="h-px bg-neutral-100 my-1 mx-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-sm lg:text-base font-semibold text-neutral-700 hover:text-black transition-colors p-2"
                >
                  <CircleUserRound size={26} className="lg:hidden" />
                  <CircleUserRound size={30} className="hidden lg:block" />
                  <span className="hidden lg:inline">Login</span>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      {!shouldHideSearchAndCart && !isAboutPage && !isContactPage && (
        <div className="container mx-auto px-2 lg:hidden">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
