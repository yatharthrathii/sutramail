import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("sutramail_user_email") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload;
      localStorage.setItem("sutramail_user_email", action.payload);
    },
    logout(state) {
      state.email = null;
      localStorage.removeItem("sutramail_user_email");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
