import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  uid: null,
  userEmail: null,
  userPhone: null,
  userName: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.uid = action.payload?.uid || null;
      state.userEmail = action.payload?.email || null;
      state.userPhone = action.payload?.phone || null;
      state.userName = action.payload?.name || null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.userEmail = null;
      state.userPhone = null;
      state.userName = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;