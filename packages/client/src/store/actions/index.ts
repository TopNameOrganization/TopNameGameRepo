import * as UserAction from './userAction'
import * as UserProfileAction from './changeUserProfileAction'
import * as LeaderboardAction from './leaderboardAction'

export default {
  ...UserAction,
  ...UserProfileAction,
  ...LeaderboardAction,
}
