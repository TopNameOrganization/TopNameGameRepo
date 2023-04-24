import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth'
import { ForumTopicAPI } from '../controllers/forumTopic.controller'

export const topicRoutes = (router: Router) => {
  const topicRouter: Router = Router()

  topicRouter
    .get('/', [], ForumTopicAPI.find)
    .get('/all', [], ForumTopicAPI.findAll)
    .post('/', [], ForumTopicAPI.createOrUpdate)
    .post('/like', [], ForumTopicAPI.like)

  router.use('/api/forum', [authMiddleware], topicRouter)
}
