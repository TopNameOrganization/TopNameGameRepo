import { createAsyncThunk } from '@reduxjs/toolkit'
import { ForumMessageData } from '../../api/types'
import { MessageAPI } from '../../api/MessageAPI'

export const getForumMessages = createAsyncThunk<
  ForumMessageData[],
  { topicId: number },
  { rejectValue: string }
>('forum/fetchForumMessages', async (data, thunkAPI) => {
  try {
    const response = await MessageAPI.getMessageList(data)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})

export const createForumMessageAction = createAsyncThunk<
  void,
  { data: ForumMessageData; onSuccess?: () => void },
  {
    rejectValue: string
  }
>('forum/createForumMessage', async (data, thunkAPI) => {
  try {
    await MessageAPI.addMessage(data.data)
    data.onSuccess?.()
  } catch (error) {
    return thunkAPI.rejectWithValue('Server Error!')
  }
})
