import * as UserAction from './userAction'
import * as ChangeUserProfileAction from './changeUserProfileAction'
import * as ChangeUserAvatarAction from './changeUserAvatarAction'

export default {
  ...UserAction,
  ...ChangeUserProfileAction,
  ...ChangeUserAvatarAction
}
