import { User } from "../../api/types";

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR'
}

export interface UserState {
  user: User;
  loading: boolean,
  error: null | string
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS,
  payload: User
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR,
  payload: string
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction
