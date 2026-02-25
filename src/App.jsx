import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import NewsLetter from "./components/NewsLetter";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import { useDispatch } from "react-redux";
import { supabase } from "./lib/supabaseClient";
import { loginSuccess, loginFailure, logout } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const user = session.user;
        const userData = {
          name: user.user_metadata.name || user.email.split('@')[0],
          email: user.email,
          _id: user.id,
        };
        dispatch(loginSuccess(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const user = session.user;
        const userData = {
          name: user.user_metadata.name || user.email.split('@')[0],
          email: user.email,
          _id: user.id,
        };
        dispatch(loginSuccess(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        // Handle logout
        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("access Token");
        localStorage.removeItem("refresh Token");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const { pathname } = location;

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";
  const isCartPage = pathname === "/cart";
  const isSearchPage = pathname === "/search";
  const isProductDetails = matchPath("/productdetails/:id", pathname);

  const hideLayout =
    isLogin ||
    isRegister ||
    isCartPage ||
    isSearchPage ||
    isProductDetails ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/edit-profile" ||
    pathname === "/my-orders" ||
    pathname === "/checkout" ||
    pathname === "/success" ||
    pathname === "/failed" ||
    matchPath("/order-details/:id", pathname);

  const isContactPage = pathname === "/contact";
  const isAboutPage = pathname === "/about";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />

      <main className="grow">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Hide Banner on contact, about, and category pages */}
      {!hideLayout && !isContactPage && !isAboutPage && !matchPath("/category/:id", pathname) && <Banner />}

      {/* Hide Newsletter on contact, about, and category pages */}
      {!hideLayout && !isContactPage && !isAboutPage && !matchPath("/category/:id", pathname) && <NewsLetter />}

      {/* Hide footer on contact and about pages */}
      {!hideLayout && !isContactPage && !isAboutPage && <Footer />}
    </div>
  );
};

export default App;
