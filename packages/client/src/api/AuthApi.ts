import { api } from './api'
import { AxiosResponse } from 'axios'
import {SigninData, SignupData, User} from "./types";

export class AuthAPI {
  static signin = (data: SigninData) =>
    api.post<string, AxiosResponse<User>>('/auth/signin', data)

  static signup(data: SignupData) {
    return api.post<string, AxiosResponse<User>>('/auth/signup', data)
  }

  static read() {
    return api.get<string, AxiosResponse<User>>('/auth/user')
  }

  static logout() {
    return api.post<string, AxiosResponse>('/auth/logout')
  }
}
