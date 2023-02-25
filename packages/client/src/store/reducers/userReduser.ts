import { User } from "../../api/types";
import {UserState, UserAction, UserActionTypes} from "../types/userTypes";

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

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return {loading: true, error: null, user: initialState.user}
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {loading: false, error: null, user: action.payload}
    case UserActionTypes.FETCH_USER_ERROR:
      return {loading: false, error: action.payload, user: initialState.user}
    default:
      return state
  }
}

export const fetchUserAction = (payload: User) => ({type: UserActionTypes.FETCH_USER, payload})
