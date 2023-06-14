import { createSlice } from "@reduxjs/toolkit";

const outliersSlice = createSlice({
  name: "outliers",
  initialState: [],
  reducers: {
    addOutliers(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.push(action.payload[i]);
      }
    },
  },
});

export const outliersActions = outliersSlice.actions;

export default outliersSlice;
