import {
  UserState,
  LeaderboardState,
  ForumTopicState,
  ForumTopicByIdState,
  ForumMessagesState,
} from './types'

export const userInitialState: UserState = {
  user: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: '',
  },
  loading: false,
  error: undefined,
}

export const leaderboardInitialState: LeaderboardState = {
  leaders: [],
  loading: false,
}

export const forumTopicInitialState: ForumTopicState = {
  topics: [],
  loading: false,
}

export const forumTopicByIdInitialState: ForumTopicByIdState = {
  topic: null,
  loading: false,
}

export const forumMessagesInitialState: ForumMessagesState = {
  messages: [],
  loading: false,
}
