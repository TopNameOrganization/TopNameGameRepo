import type { Request, Response, NextFunction } from 'express'
import { forumMessageService } from '../services/forumMessage.service'

export class ForumMessageAPI {
  public static createOrUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { body } = request
    try {
      await forumMessageService.createOrUpdate(body)
      response.json('ok')
    } catch (e) {
      next(e)
    }
  }

  public static find = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { query } = request
    const found = await forumMessageService.find(query)
    if (found) {
      response.json({ ...found.dataValues })
    } else {
      next('err!!1 notfound')
    }
  }

  public static findAll = async (request: Request, response: Response) => {
    console.log(request)
    const { query } = request
    const res = await forumMessageService.findAll(query)
    response.json(res)
  }

  public static delete = async (request: Request) => {
    const { query } = request
    await forumMessageService.delete(query)
  }
}
