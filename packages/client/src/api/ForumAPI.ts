import { AxiosResponse } from 'axios'
import { ForumTopicData } from './types';
import { apiServer } from './api';

export class ForumAPI {
  static addTopic = (data: ForumTopicData) =>
    apiServer.post<string, AxiosResponse<string>>('/', data)
      .then((res) => res)
      .catch((err) => console.log(err));

  static getTopic = ({ id }: { id: number }) =>
    apiServer.get<string, AxiosResponse<ForumTopicData>>(`/`, { params: { id } })
      .then((res) => res)
      .catch((err) => console.log(err));

  static getTopicList = () =>
    apiServer.get<string, AxiosResponse<ForumTopicData[]>>(`/all`)
      .then((res) => res)
      .catch((err) => console.log(err));
}
