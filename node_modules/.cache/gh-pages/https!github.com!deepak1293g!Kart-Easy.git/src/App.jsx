import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartMobile from "./components/CartMobile";

const App = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isSearchPage = location.pathname === "/search";

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
        {/* Show only on home page and on mobile */}
      </main>
      <Footer />
      {!isCartPage && !isSearchPage && !isLogin && !isRegister && (
        <CartMobile />
      )}
    </>
  );
};

export default App;
