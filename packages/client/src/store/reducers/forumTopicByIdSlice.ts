import { createSlice } from '@reduxjs/toolkit'
import { getForumTopic } from '../actions/forumTopicAction'
import { forumTopicByIdInitialState } from '../constants'

export const forumTopicByIdSlice = createSlice({
  name: 'forumTopicById',
  initialState: forumTopicByIdInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForumTopic.pending, state => {
        state.loading = true
        state.error = undefined
        state.topic = forumTopicByIdInitialState.topic
      })
      .addCase(getForumTopic.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.topic = action.payload
      })
      .addCase(getForumTopic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.topic = forumTopicByIdInitialState.topic
      })
  },
})

export const forumTopicByIdReducer = forumTopicByIdSlice.reducer
