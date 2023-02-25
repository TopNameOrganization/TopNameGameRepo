import { combineReducers } from "redux";
import { userReducer } from "./userReduser";
import { changeUserProfileReducer } from "./changeUserProfileReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  changeUserProfile: changeUserProfileReducer
})

export type RootState = ReturnType<typeof rootReducer>
