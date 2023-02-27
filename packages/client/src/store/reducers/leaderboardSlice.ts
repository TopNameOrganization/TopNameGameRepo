import { createSlice } from "@reduxjs/toolkit";
import { getLeaders } from '../actions/leaderboardAction'
import { leaderboardInitialState } from "../constants";

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: leaderboardInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leaders = leaderboardInitialState.leaders;
      })
      .addCase(getLeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.leaders = action.payload.map((item) => item.data)
      })
      .addCase(getLeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.leaders = leaderboardInitialState.leaders;
      })
  }
})

export const leaderboardReducer = leaderboardSlice.reducer;
