import { AxiosResponse } from 'axios'
import { ForumMessageData } from './types'
import { apiMessage } from './api'

export class MessageAPI {
  static addMessage = (data: ForumMessageData) =>
    apiMessage.post<string, AxiosResponse<string>>('/', data).then(res => res)

  static getMessageList = ({ topicId }: { topicId: number }) =>
    apiMessage
      .get<string, AxiosResponse<ForumMessageData[]>>(`/findByTopic`, {
        params: { topicId },
      })
      .then(res => res)
}
