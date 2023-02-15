import { api } from './api'
import { AxiosResponse } from 'axios'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
}

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
