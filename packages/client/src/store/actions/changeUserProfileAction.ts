import {Dispatch} from "redux";
import UsersAPI from "../../api/UsersAPI";
import {ChangeUserProfileAction, ChangeUserProfileActionTypes} from "../types/changeUserProfileTypes";
import {UserProfileData} from "../../api/types";

export const changeUserProfile = (userProfile: UserProfileData) => {
  return async (dispatch: Dispatch<ChangeUserProfileAction>) => {
    try {
      dispatch({type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE})
      const response = await UsersAPI.changeUserProfile(userProfile)
      dispatch({type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_SUCCESS, payload: response.data})
    } catch (error) {
      dispatch({type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_ERROR, payload: 'Server Error!'})
      console.log(error)
    }
  }
}
