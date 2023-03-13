import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../api/types'
import { AuthAPI } from '../../api/AuthApi'
import { UserService } from '../types'

export const loadMe = createAsyncThunk<User>(
  'root/loadGreeting',
  async (_, thunkApi) => {
    const service: UserService = thunkApi.extra as UserService
    return service.getCurrentUser()
  }
)

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await AuthAPI.read()
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Server Error!')
    }
  }
)
