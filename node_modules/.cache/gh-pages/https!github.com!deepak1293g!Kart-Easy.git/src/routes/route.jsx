import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import CartMobile from "@/components/CartMobile";
import Success from "@/components/Success";
import Failed from "@/components/Failed";
import ProductListPage from "@/pages/ProductListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/productdetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/cartmobile",
        element: <CartMobile />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/failed",
        element: <Failed />,
      },
      {
        path: "/category/:id",
        element: <ProductListPage />,
      },
    ],
  },
]);

export default router;
