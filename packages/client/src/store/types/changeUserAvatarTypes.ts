export enum ChangeUserAvatarActionTypes {
  CHANGE_USER_AVATAR = 'CHANGE_USER_AVATAR',
  CHANGE_USER_AVATAR_SUCCESS = 'CHANGE_USER_AVATAR_SUCCESS',
  CHANGE_USER_AVATAR_ERROR = 'CHANGE_USER_AVATAR_ERROR'
}

interface IChangeUserAvatarAction {
  type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR
}

interface IChangeUserAvatarSuccessAction {
  type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_SUCCESS,
  payload: FormData
}

interface IChangeUserAvatarErrorAction {
  type: ChangeUserAvatarActionTypes.CHANGE_USER_AVATAR_ERROR,
  payload: string
}

export type ChangeUserAvatarAction =
  IChangeUserAvatarAction |
  IChangeUserAvatarSuccessAction |
  IChangeUserAvatarErrorAction
