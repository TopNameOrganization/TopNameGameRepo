import {User} from "../api/types";

export interface UserState {
  user: User;
  loading: boolean,
  error?: string
}
