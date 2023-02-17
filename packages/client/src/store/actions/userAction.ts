import {AuthAPI} from "../../api/AuthApi";
import {UserAction, UserActionTypes} from "../types/userTypes";
import {Dispatch} from "redux";

export const fetchUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({type: UserActionTypes.FETCH_USER})
      const response = await AuthAPI.read()
      dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: response.data})
    } catch (error) {
      dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: 'Server Error!'})
      console.log(error)
    }
  }
}
