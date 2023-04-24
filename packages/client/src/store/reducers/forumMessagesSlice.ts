import { createSlice } from '@reduxjs/toolkit'
import { getForumMessages } from '../actions/forumMessageAction'
import { forumMessagesInitialState } from '../constants'

export const forumMessagesSlice = createSlice({
  name: 'forumMessages',
  initialState: forumMessagesInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForumMessages.pending, state => {
        state.loading = true
        state.error = undefined
        state.messages = forumMessagesInitialState.messages
      })
      .addCase(getForumMessages.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.messages = action.payload
      })
      .addCase(getForumMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.messages = forumMessagesInitialState.messages
      })
  },
})

export const forumMessagesReducer = forumMessagesSlice.reducer
