import { createSlice } from '@reduxjs/toolkit'
import { getForumTopics } from '../actions/forumTopicAction'
import { forumTopicInitialState } from '../constants'

export const forumTopicSlice = createSlice({
  name: 'forumTopic',
  initialState: forumTopicInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForumTopics.pending, state => {
        state.loading = true
        state.error = undefined
        state.topics = forumTopicInitialState.topics
      })
      .addCase(getForumTopics.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.topics = action.payload
      })
      .addCase(getForumTopics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.topics = forumTopicInitialState.topics
      })
  },
})

export const forumTopicReducer = forumTopicSlice.reducer
