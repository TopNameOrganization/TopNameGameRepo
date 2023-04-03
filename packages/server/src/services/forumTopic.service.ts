// @ts-ignore  
import type BaseRESTService from './BaseRESTService';
import { Topic } from '../models/forumTopic.model';
import { CreateRequest } from '../models/types';

type FindRequest = {
  id?: number;
}

class ForumTopicService implements BaseRESTService {
  public findAll = () => {
    return Topic.findAll({
      attributes: ['id', 'nickName', 'title', 'shortDescription', 'avatarUrl']
    });
  }

  public find = ({ id }: FindRequest) => {
    return Topic.findOne({
      where: {
        id
      },
      attributes: ['id', 'nickName', 'title', 'message', 'avatarUrl']
    })
  }

  public createOrUpdate = async (data: CreateRequest) => {
    const { id } = data;
    if (id) {
      const existed = await this.find({ id });
      if (existed) {
        return Topic.update(data, {
          where: {
            id: existed.id
          }
        })
      }
    }
    return Topic.create(data);
  }
}

export const forumTopicService = new ForumTopicService();
export default ForumTopicService;
