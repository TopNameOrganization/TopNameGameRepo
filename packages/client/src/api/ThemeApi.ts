import { apiTheme } from './api'
import { AxiosResponse } from 'axios'
import { ThemeData } from './types'

export class ThemeAPI {
  static addTheme = (data: ThemeData) =>
    apiTheme.post<string, AxiosResponse<string>>('/', data).then(res => res)

  static getTheme = ({ id, userId }: { id?: number; userId?: number }) =>
    apiTheme
      .get<string, AxiosResponse<ThemeData>>(`/`, { params: { id, userId } })
      .then(res => res)
}
