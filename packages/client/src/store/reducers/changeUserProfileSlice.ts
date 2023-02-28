import {createSlice} from "@reduxjs/toolkit";
import {changeUserProfile} from "../actions/changeUserProfileAction";
import {userInitialState} from "../constants";

export const changeUserProfileSlice = createSlice({
  name: 'userProfile',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeUserProfile.pending, (state) => {
        state.loading = true
        state.error = undefined
        state.user = userInitialState.user
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.user = action.payload
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.user = userInitialState.user
      })
  }
})

export const changeUserProfileReducer = changeUserProfileSlice.reducer
