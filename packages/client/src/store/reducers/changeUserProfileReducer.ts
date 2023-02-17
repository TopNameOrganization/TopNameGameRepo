import { User } from "../../api/types";
import { IUserState } from "../types/userTypes";
import { ChangeUserProfileAction, ChangeUserProfileActionTypes } from "../types/changeUserProfileTypes";

const initialState: IUserState = {
  user: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
  },
  loading: false,
  error: null
}

export const changeUserProfileReducer = (state: IUserState = initialState, action: ChangeUserProfileAction): IUserState => {
  switch (action.type) {
    case ChangeUserProfileActionTypes.CHANGE_USER_PROFILE:
      return {loading: true, error: null, user: initialState.user}
    case ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_SUCCESS:
      return {loading: false, error: null, user: action.payload}
    case ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_ERROR:
      return {loading: false, error: action.payload, user: initialState.user}
    default:
      return state
  }
}

export const changeUserProfileAction = (payload: User) => ({type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE, payload})
