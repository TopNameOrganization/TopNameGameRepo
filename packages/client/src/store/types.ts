import { User, LeaderData } from "../api/types";

export interface UserState {
  user: User;
  loading: boolean,
  error: null | string | unknown
}

export interface LeaderboardState {
  leaders: [] | LeaderData[],
  loading: boolean,
  error: null | string | unknown,
}
