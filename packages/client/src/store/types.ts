import {
  User,
  LeaderData,
  ForumTopicData,
  ForumMessageData,
} from '../api/types'

export interface UserState {
  user: User
  loading: boolean
  error?: string
}

export interface LeaderboardState {
  leaders: LeaderData[]
  loading: boolean
  error?: string
}

export interface ForumTopicState {
  topics: ForumTopicData[]
  loading: boolean
  error?: string
}

export interface ForumTopicByIdState {
  topic: ForumTopicData | null
  loading: boolean
  error?: string
}

export interface ForumMessagesState {
  messages: ForumMessageData[]
  loading: boolean
  error?: string
}
