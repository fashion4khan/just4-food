import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userPhone: null,
  userName: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userPhone = action.payload?.phone || null;
      state.userName = action.payload?.name || null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userPhone = null;
      state.userName = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;