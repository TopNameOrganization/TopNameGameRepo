import { AxiosResponse } from 'axios'
import { ForumTopicData, LikeRequest } from './types'
import { apiTopic } from './api'

export class ForumAPI {
  static addTopic = (data: ForumTopicData) =>
    apiTopic.post<string, AxiosResponse<string>>('/', data).then(res => res)

  static getTopic = ({ id }: { id: number }) =>
    apiTopic
      .get<string, AxiosResponse<ForumTopicData>>(`/`, { params: { id } })
      .then(res => res)

  static getTopicList = () =>
    apiTopic
      .get<string, AxiosResponse<ForumTopicData[]>>(`/all`)
      .then(res => res)

  static likeTopic = (data: LikeRequest) =>
    apiTopic.post<string, AxiosResponse<string>>('/like', data).then(res => res)
}
