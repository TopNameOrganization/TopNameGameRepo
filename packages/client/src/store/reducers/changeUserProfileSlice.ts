import {createSlice} from "@reduxjs/toolkit";
import {changeUserProfile} from "../actions/changeUserProfileAction";
import {initialState} from "../constants";

export const changeUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = initialState.user
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.user = action.payload
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = initialState.user
      })
  }
})

export const changeUserProfileReducer = changeUserProfileSlice.reducer
