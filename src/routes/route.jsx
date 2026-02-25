import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import CartMobile from "@/components/CartMobile";
import Success from "@/components/Success";
import Failed from "@/components/Failed";
import ProductListPage from "@/pages/ProductListPage";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import ProtectedRoute from "@/components/ProtectedRoute";
import EditProfile from "@/pages/EditProfile";
import Orders from "@/pages/Orders";
import Checkout from "@/pages/Checkout";
import OrderDetails from "@/pages/OrderDetails";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
      },

      {
        path: "/productdetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cartmobile",
        element: (
          <ProtectedRoute>
            <CartMobile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        ),
      },
      {
        path: "/failed",
        element: (
          <ProtectedRoute>
            <Failed />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:id",
        element: <ProductListPage />,
      },
      {
        path: "/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-details/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
