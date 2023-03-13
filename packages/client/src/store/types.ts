import { User, LeaderData } from '../api/types'

export interface UserService {
  getCurrentUser(): Promise<User>
}

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
