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
      className="glass sticky top-0 z-40 w-full py-2 lg:py-4 transition-all duration-500"
    >
      <div className="max-w-[1400px] mx-auto flex items-center px-10 justify-between gap-4 md:gap-8">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 cursor-pointer group p-0.5 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-all shadow-sm hover:shadow-md overflow-hidden"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                    {user.profilePic ? (
                      <img src={user.profilePic} className="w-full h-full object-cover" alt="profile" />
                    ) : (
                      <CircleUserRound size={22} className="text-neutral-400" />
                    )}
                  </div>
                  <div className="pr-3 hidden md:block">
                    <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 glass-dark rounded-[2rem] overflow-hidden py-2 z-50 shadow-2xl shadow-black/20"
                    >
                      <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Authenticated Node</p>
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      </div>
                      <Link
                        to="/edit-profile"
                        className="flex items-center gap-3 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={16} />
                        Identity Profile
                      </Link>
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-3 px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
                        onClick={() => setShowDropdown(false)}
                      >
                        <ShoppingBag size={16} />
                        Asset History
                      </Link>
                      <div className="h-px bg-white/10 my-2 mx-4"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut size={16} />
                        Deauthorize
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
        <div className="max-w-[1400px] mx-auto px-10 lg:hidden mt-3">
          <Search />
        </div>
      )}
    </motion.header>
  );
};

export default Header;
