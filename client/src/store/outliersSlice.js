import { createSlice } from "@reduxjs/toolkit";

const outliersSlice = createSlice({
  name: "outliers",
  initialState: { outliersList: [], isFiltered: false },
  reducers: {
    addOutliers(state, action) {
      for (let i = 0; i < action.payload.length; i++) {
        state.outliersList.push(action.payload[i]);
      }
    },
    setIsFiltered(state, action) {
      state.isFiltered = action.payload;
    },
  },
});

export const outliersActions = outliersSlice.actions;

export default outliersSlice;
