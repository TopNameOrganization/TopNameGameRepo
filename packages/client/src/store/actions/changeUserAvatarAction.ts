import {Dispatch} from "redux";
import UsersAPI from "../../api/UsersAPI";
import {ChangeUserAvatarAction, ChangeUserAvatarActionTypes} from "../types/changeUserAvatarTypes";

export const changeUserAvatar = (userAvatar: FormData) => {
  return async (dispatch: Dispatch<ChangeUserAvatarAction>) => {
    try {
      dispatch({type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR})
      const response = await UsersAPI.changeUserAvatar(userAvatar)
      dispatch({type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_SUCCESS, payload: response.data})
    } catch (error) {
      dispatch({type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_ERROR, payload: 'Server Error!'})
      console.log(error)
    }
  }
}
