import { User } from "../../api/types";
import { UserState } from "../types/userTypes";
import { UserProfileAction, ChangeUserProfileActionTypes } from "../types/changeUserProfileTypes";

const initialState: UserState = {
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

export const changeUserProfileReducer = (state: UserState = initialState, action: UserProfileAction): UserState => {
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
