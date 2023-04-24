// @ts-ignore
import type BaseRESTService from './BaseRESTService'
import { Message } from '../models/message.model'
import { CreateMessageRequest } from '../models/types'

type FindRequest = {
  id?: number
  topicId?: number
}

class ForumMessageService implements BaseRESTService {
  public find = ({ id }: FindRequest) => {
    return Message.findOne({
      where: {
        id,
      },
      attributes: ['id', 'topicId', 'ownerId', 'nickName', 'message'],
    })
  }

  public delete = ({ id }: FindRequest) => {
    return Message.destroy({ where: { id } })
  }

  public findAll = ({ topicId }: FindRequest) => {
    return Message.findAll({
      where: {
        topicId,
      },
      attributes: ['id', 'ownerId', 'nickName', 'message'],
    })
  }

  public createOrUpdate = async (data: CreateMessageRequest) => {
    const { id } = data
    if (id) {
      const existed = await this.find({ id })
      if (existed) {
        return Message.update(data, {
          where: {
            id: existed.id,
          },
        })
      }
    }
    return Message.create(data)
  }
}

export const forumMessageService = new ForumMessageService()
export default ForumMessageService
