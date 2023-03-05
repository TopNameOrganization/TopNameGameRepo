import { AuthAPI } from "../../api/AuthApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {User} from "../../api/types";

export const fetchUser = createAsyncThunk<User, void, {
  rejectValue: string
}>(
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
