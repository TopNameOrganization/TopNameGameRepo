import { User, LeaderData } from "../api/types";

export interface UserState {
  user: User;
  loading: boolean,
  error?: string,
}

export interface LeaderboardState {
  leaders: LeaderData[],
  loading: boolean,
  error?: string,
}
