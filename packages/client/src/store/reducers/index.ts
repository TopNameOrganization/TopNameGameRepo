import { combineReducers } from "redux";
import { userReducer } from "./userSlice";
import { changeUserProfileReducer } from "./changeUserProfileSlice";
import { leaderboardReducer } from './leaderboardSlice';
import { setupStore } from "../index";

export const rootReducer = combineReducers({
  userReducer,
  changeUserProfileReducer,
  leaderboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
