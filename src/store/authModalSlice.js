import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    isOpen: false,
    mode: "login", // "login" | "signup"
  },
  reducers: {
    openAuthModal: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload || "login";
    },
    closeAuthModal: (state) => {
      state.isOpen = false;
    },
    setAuthMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, setAuthMode } = authModalSlice.actions;
export default authModalSlice.reducer;