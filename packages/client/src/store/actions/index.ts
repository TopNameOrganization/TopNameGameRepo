import * as UserAction from './userAction'
import * as UserProfileAction from './changeUserProfileAction'
import * as LeaderboardAction from './leaderboardAction'
import * as ForumTopicAction from './forumTopicAction'
import * as forumMessageAction from './forumMessageAction'

export default {
  ...UserAction,
  ...UserProfileAction,
  ...LeaderboardAction,
  ...ForumTopicAction,
  ...forumMessageAction,
}
