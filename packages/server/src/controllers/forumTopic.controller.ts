import type { Request, Response, NextFunction } from 'express';
import { forumTopicService } from '../services/forumTopic.service';

export class ForumTopicAPI {
  public static createOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
    const { body } = request;
    try {
      await forumTopicService.createOrUpdate(body)
      response.json('ok');
    } catch (e) {
      next(e);
    }
  }

  public static find = async (request: Request, response: Response, next: NextFunction) => {
    const { query } = request;
    const found = await forumTopicService.find(query);
    if (found) {
      response.json({ ...found.dataValues })
    } else {
      next('err!!1 notfound')
    }
  }

  public static findAll = async (request: Request, response: Response) => {
    console.log(request.body);
    const res = await forumTopicService.findAll();
    response.json(res);
  }
}
