import { combineReducers } from "redux";
import { userReducer } from "./userSlice";
import { changeUserProfileReducer } from "./changeUserProfileSlice";
import { leaderboardReducer } from './leaderboardSlice';
import { setupStore } from "../index";
import { connectRouter } from "connected-react-router";
import { History } from 'history';

export const rootReducer = (history: History) => combineReducers({
  userReducer,
  changeUserProfileReducer,
  leaderboardReducer,
  router: connectRouter(history)
});
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<ReturnType<typeof rootReducer>>;//TODO
export type AppDispatch = AppStore['dispatch'];