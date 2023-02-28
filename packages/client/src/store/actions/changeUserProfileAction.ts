import UsersAPI from "../../api/UsersAPI";
import { UserProfileData } from "../../api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changeUserProfile = createAsyncThunk<any, UserProfileData, { rejectValue: string }>(
  'userProfile/changeUserProfile',
  async (userProfile, thunkAPI) => {
    try {
      const response = await UsersAPI.changeUserProfile(userProfile)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Server Error!')
    }
  }
)
