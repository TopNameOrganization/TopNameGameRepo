// @ts-ignore
import type BaseRESTService from './BaseRESTService'
import { Topic } from '../models/forumTopic.model'
import { CreateTopicRequest } from '../models/types'

type LikeRequest = {
  topicId: number
  ownerId: number
}

type FindRequest = {
  id?: number
}

class ForumTopicService implements BaseRESTService {
  public findAll = () => {
    return Topic.findAll({
      attributes: [
        'id',
        'nickName',
        'title',
        'shortDescription',
        'avatarUrl',
        'likes',
      ],
    })
  }

  public find = ({ id }: FindRequest) => {
    return Topic.findOne({
      where: {
        id,
      },
      attributes: [
        'id',
        'nickName',
        'title',
        'shortDescription',
        'avatarUrl',
        'likes',
      ],
    })
  }

  public createOrUpdate = async (data: CreateTopicRequest) => {
    const { id } = data
    if (id) {
      const existed = await this.find({ id })
      if (existed) {
        return Topic.update(data, {
          where: {
            id: existed.id,
          },
        })
      }
    }
    return Topic.create(data)
  }

  public like = async ({ topicId, ownerId }: LikeRequest) => {
    const topic = await this.find({
      id: topicId,
    })
    const likes = topic?.likes || []

    const newLikes = likes.includes(ownerId)
      ? likes.filter(el => el !== ownerId)
      : [...likes, ownerId]

    const data = { ...topic, likes: newLikes }
    return Topic.update(data, {
      where: {
        id: topicId,
      },
    })
  }
}

export const forumTopicService = new ForumTopicService()
export default ForumTopicService
