import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../actions/userAction";
import { userInitialState } from "../constants";

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = userInitialState.user
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = userInitialState.user
      })
  }
})

export const userReducer = userSlice.reducer
