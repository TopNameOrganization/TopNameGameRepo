import { User } from "../../api/types";
import { IUserState } from "../types/userTypes";
import { ChangeUserAvatarAction, ChangeUserAvatarActionTypes } from "../types/changeUserAvatarTypes";

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

export const changeUserAvatarReducer = (state: IUserState = initialState, action: ChangeUserAvatarAction): IUserState => {
  switch (action.type) {
    case ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR:
      return {loading: true, error: null, user: initialState.user}
    case ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_SUCCESS:
      return {loading: false, error: null, user: action.payload}
    case ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_ERROR:
      return {loading: false, error: action.payload, user: initialState.user}
    default:
      return state
  }
}

export const changeUserAvatarAction = (payload: User) => ({type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR, payload})
