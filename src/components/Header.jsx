import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import { CircleUserRound, LogOut, User, ShoppingBag, ChevronDown } from "lucide-react";
import useMobile from "../hooks/useMobile";
import { BsCart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import authService from "../utils/authService";
import { motion, AnimatePresence } from "framer-motion";

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
    pathname === "/checkout" ||
    matchPath("/order-details/:id", pathname);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on navigation and click outside
  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/95 backdrop-blur-md border-b border-neutral-100 sticky top-0 z-40 w-full py-2 lg:py-4 transition-all duration-500 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto flex items-center px-6 justify-between gap-4 md:gap-14">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="flex items-center group">
            <div className="relative overflow-hidden">
              <img
                src={logo}
                width={200}
                height={50}
                alt="logo"
                className="hidden lg:block brightness-100 group-hover:brightness-110 transition-all"
              />
              <img
                src={logo}
                width={140}
                height={40}
                alt="logo"
                className="lg:hidden brightness-100 group-hover:brightness-110 transition-all"
              />
            </div>
          </Link>
        </motion.div>

        {!shouldHideSearchAndCart && (
          <div className="hidden lg:block">
            <Search />
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-6">
          {/* Cart Icon - Only show if logged in */}
          {!shouldHideSearchAndCart && user && !isCartPage && !isAboutPage && !isContactPage && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer flex items-center justify-center p-2.5 text-neutral-600 hover:text-black bg-neutral-50 rounded-xl border border-neutral-100 transition-all shadow-sm hover:shadow-md"
              onClick={handleCartClick}
            >
              <BsCart size={22} className="md:w-6 md:h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {cartItems.length}
                </span>
              )}
            </motion.button>
          )}

          {/* Hide login/profile on auth, contact and about pages */}
          {!isContactPage && !isAboutPage && !isLogin && !isRegister && pathname !== "/forgot-password" && (
            user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 cursor-pointer group p-0.5 rounded-2xl bg-neutral-50 border border-neutral-100/50 hover:bg-neutral-100/50 transition-all overflow-hidden"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-neutral-100 shadow-sm">
                    {user.profilePic ? (
                      <img src={user.profilePic} className="w-full h-full object-cover" alt="profile" />
                    ) : (
                      <CircleUserRound size={22} className="text-neutral-400" />
                    )}
                  </div>
                  <div className="pr-3 hidden md:block">
                    <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-500 ${showDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-52 bg-white border border-neutral-100 rounded-[1.5rem] overflow-hidden p-1.5 z-50 shadow-2xl shadow-neutral-200/40"
                    >
                      <div className="px-4 py-3">
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-0.5">Signed in as</p>
                        <p className="text-xs font-black text-neutral-900 truncate italic">{user.name}</p>
                      </div>

                      <div className="h-px bg-neutral-50 mx-2" />

                      <div className="py-1">
                        <Link
                          to="/edit-profile"
                          className="flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-xl transition-all"
                          onClick={() => setShowDropdown(false)}
                        >
                          <User size={13} className="text-neutral-400" />
                          Profile
                        </Link>

                        <div className="h-px bg-neutral-50 mx-2" />

                        <Link
                          to="/my-orders"
                          className="flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-xl transition-all"
                          onClick={() => setShowDropdown(false)}
                        >
                          <ShoppingBag size={13} className="text-neutral-400" />
                          Orders
                        </Link>
                      </div>

                      <div className="h-px bg-neutral-50 mx-2" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={13} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
        <div className="max-w-[1400px] mx-auto px-6 lg:hidden mt-3">
          <Search />
        </div>
      )}
    </motion.header>
  );
};

export default Header;
