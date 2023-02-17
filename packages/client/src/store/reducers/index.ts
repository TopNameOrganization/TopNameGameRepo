import { combineReducers } from "redux";
import { userReducer } from "./userReduser";
import { changeUserProfileReducer } from "./changeUserProfileReducer";
import { changeUserAvatarReducer } from "./changeUserAvatarReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  changeUserProfile: changeUserProfileReducer,
  changeUserAvatar: changeUserAvatarReducer
})

export type RootState = ReturnType<typeof rootReducer>
