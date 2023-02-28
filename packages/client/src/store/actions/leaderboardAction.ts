import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeaderData } from "../../api/types";
import { LeaderBoardAPI } from '../../api/LeaderBoardApi'

export const getLeaders = createAsyncThunk<{ data: LeaderData }[], string, { rejectValue: string }>(
  'leaderboard/getLeaders',
  async (field, thunkAPI) => {
    try {
      const response = await LeaderBoardAPI.getLeaders(field);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Server Error!');
    }
  }
)
