import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import betSlice from "./betSlice";
import outliersSlice from "./outliersSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    bets: betSlice.reducer,
    outliers: outliersSlice.reducer,
  },
});

export default store;
