import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartMobile from "./components/CartMobile";
import Banner from "./components/Banner";
import NewsLetter from "./components/NewsLetter";

const App = () => {
  const location = useLocation();
  const { pathname } = location;

  const isCartPage = pathname === "/cart";
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";
  const isSearchPage = pathname === "/search";
  const isProductDetails = matchPath("/productdetails/:id", pathname);

  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Outlet />
      </main>

      {!isCartPage &&
        !isSearchPage &&
        !isLogin &&
        !isRegister &&
        !isProductDetails && <Banner />}

      {!isLogin &&
        !isRegister &&
        !isProductDetails &&
        !isCartPage &&
        !isSearchPage && <NewsLetter />}

      <Footer />

      {!isCartPage && !isSearchPage && !isLogin && !isRegister && (
        <CartMobile />
      )}
    </>
  );
};

export default App;
