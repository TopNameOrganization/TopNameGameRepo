import { AuthAPI } from "../../api/AuthApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await AuthAPI.read()
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Server Error!')
    }
  }
)
