import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeaderBoardAPI } from '../../api/LeaderBoardApi'

export const getLeaders = createAsyncThunk(
  'leaderboard/getLeaders',
  async (field: string, thunkAPI) => {
    try {
      const response = await LeaderBoardAPI.getLeaders(field);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Server Error!');
    }
  }
)
