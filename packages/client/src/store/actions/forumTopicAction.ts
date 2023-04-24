import { createAsyncThunk } from '@reduxjs/toolkit'
import { ForumTopicData, LikeRequest } from '../../api/types'
import { ForumAPI } from '../../api/ForumAPI'

export const getForumTopics = createAsyncThunk<
  ForumTopicData[],
  void,
  { rejectValue: string }
>('forum/fetchTopics', async (_, thunkAPI) => {
  try {
    const response = await ForumAPI.getTopicList()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})

export const getForumTopic = createAsyncThunk<
  ForumTopicData,
  { id: number },
  { rejectValue: string }
>('forum/fetchTopic', async (data, thunkAPI) => {
  try {
    const response = await ForumAPI.getTopic(data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})

export const createForumTopicAction = createAsyncThunk<
  void,
  { data: ForumTopicData; onSuccess?: () => void },
  {
    rejectValue: string
  }
>('forum/createForumTopic', async (data, thunkAPI) => {
  try {
    await ForumAPI.addTopic(data.data)
    data.onSuccess?.()
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})

export const likeForumTopicAction = createAsyncThunk<
  void,
  { data: LikeRequest; onSuccess?: () => void },
  {
    rejectValue: string
  }
>('forum/likeForumTopic', async (data, thunkAPI) => {
  try {
    await ForumAPI.likeTopic(data.data)
    data.onSuccess?.()
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})
