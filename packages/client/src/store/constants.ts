import {UserState} from "./types/userTypes";

export const initialState: UserState = {
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
