import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { id: 0, username: null, isLoggedIn: false, favorites: [] },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.favorites = action.payload.favorites;
    },
    resetState(state, action) {
      return { id: 0, username: null, isLoggedIn: false, favorites: [] };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
