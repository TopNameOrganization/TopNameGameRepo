import { UserState, LeaderboardState } from "./types";

export const userInitialState: UserState = {
  user: {
    id: null,
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: '',
    avatar: ''
  },
  loading: false,
  error: null
}

export const leaderboardInitialState: LeaderboardState = {
  leaders: [],
  loading: false,
  error: null,
}
