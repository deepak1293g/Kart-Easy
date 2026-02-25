import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
