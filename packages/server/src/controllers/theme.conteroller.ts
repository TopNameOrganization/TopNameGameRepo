import type { Request, Response, NextFunction } from 'express'
import { themeService } from '../services/theme.service'

export class ThemeAPI {
  public static createOrUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { body } = request
    try {
      await themeService.createOrUpdate(body)
      response.json('ok')
    } catch (e) {
      next(e)
    }
  }

  public static find = async (request: Request, response: Response) => {
    const { query } = request
    const found = await themeService.find(query)
    if (found) {
      response.json({ ...found.dataValues })
    } else {
      response.json({})
    }
  }
}
