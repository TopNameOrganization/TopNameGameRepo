// @ts-ignore
import type BaseRESTService from './BaseRESTService'
import { Theme } from '../models/theme.model'
import type { CreateThemeRequest } from '../models/types'

type FindRequest = {
  id?: number
  userId?: string
}

class ThemeService implements BaseRESTService {
  public find = async ({ id, userId }: FindRequest) => {
    const where: FindRequest = {}
    if (id) where.id = id
    if (userId) where.userId = userId

    return Theme.findOne({
      where,
      attributes: ['id', 'theme', 'userId'],
    })
  }

  public createOrUpdate = async (data: CreateThemeRequest) => {
    const { id } = data
    if (id) {
      const existed = await this.find({ id })
      if (existed) {
        return Theme.update(data, {
          where: {
            id: existed.id,
          },
        })
      }
    }
    return Theme.create(data)
  }
}

export const themeService = new ThemeService()
export default ThemeService
