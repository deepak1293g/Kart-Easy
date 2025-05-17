import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  // avatar: "",
  mobile: "",
  verify_Email: "",
  last_Login: "",
  status: "",
  address_Details: [],
  shopping_Cart: [],
  order_History: [],
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      // state.avatar = action.payload?.avatar;
      state.mobile = action.payload?.mobile;
      state.verify_Email = action.payload?.verify_Email;
      state.last_Login = action.payload?.last_Login;
      state.status = action.payload?.status;
      state.address_Details = action.payload?.address_Details;
      state.shopping_Cart = action.payload?.shopping_Cart;
      state.order_History = action.payload?.order_History;
      state.role = action.payload?.role;
    },
    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      // state.avatar = "";
      state.mobile = "";
      state.verify_Email = "";
      state.last_Login = "";
      state.status = "";
      state.address_Details = [];
      state.shopping_Cart = [];
      state.order_History = [];
      state.role = "";
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
