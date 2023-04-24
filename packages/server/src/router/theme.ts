import { Router } from 'express'
import { ThemeAPI } from '../controllers/theme.conteroller'

export const themeRoutes = (router: Router) => {
  const themeRouter: Router = Router()

  themeRouter.get('/', [], ThemeAPI.find).post('/', [], ThemeAPI.createOrUpdate)

  router.use('/api/theme', themeRouter)
}
