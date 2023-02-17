import { User } from "../../api/types";

export enum ChangeUserProfileActionTypes {
  CHANGE_USER_PROFILE = 'CHANGE_USER_PROFILE',
  CHANGE_USER_PROFILE_SUCCESS = 'CHANGE_USER_PROFILE_SUCCESS',
  CHANGE_USER_PROFILE_ERROR = 'CHANGE_USER_PROFILE_ERROR'
}

interface IChangeUserProfileAction {
  type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE
}

interface IChangeUserProfileSuccessAction {
  type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_SUCCESS,
  payload: User
}

interface IChangeUserProfileErrorAction {
  type: ChangeUserProfileActionTypes.CHANGE_USER_PROFILE_ERROR,
  payload: string
}

export type ChangeUserProfileAction =
  IChangeUserProfileAction |
  IChangeUserProfileSuccessAction |
  IChangeUserProfileErrorAction
