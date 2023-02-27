import { createSlice } from "@reduxjs/toolkit";
import { getLeaders } from '../actions/leaderboardAction'

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: { leaders: [], error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leaders = [];
      })
      .addCase(getLeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.leaders = action.payload.map(({ data }) => data)
      })
      .addCase(getLeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.leaders = [];
      })
  }
})

export const leaderboardReducer = leaderboardSlice.reducer;
