import { User } from "../../api/types";

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR'
}

export interface IUserState {
  user: User;
  loading: boolean,
  error: null | string
}

interface IFetchUserAction {
  type: UserActionTypes.FETCH_USER
}

interface IFetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS,
  payload: User
}

interface IFetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR,
  payload: string
}

export type UserAction = IFetchUserAction | IFetchUserSuccessAction | IFetchUserErrorAction
