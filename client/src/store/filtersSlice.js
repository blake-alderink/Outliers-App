import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { sports: [], betTypes: [], teams: [] },
  reducers: {
    filterSports(state, action) {
      state.sports = action.payload;
    },

    filterBetTypes(state, action) {
      state.betTypes = action.payload;
    },
    filterTeams(state, action) {
      state.teams = action.payload;
    },
  },
});

export default filtersSlice;

export const filtersActions = filtersSlice.actions;
