import { Router } from 'express'
import { ForumMessageAPI } from '../controllers/forumMessage.controller'

export const messageRoutes = (router: Router) => {
  const messageRouter: Router = Router()

  messageRouter
    .get('/', [], ForumMessageAPI.find)
    .get('/findByTopic', [], ForumMessageAPI.findAll)
    .post('/', [], ForumMessageAPI.createOrUpdate)
    .delete('/', [], ForumMessageAPI.delete)

  router.use('/api/message', messageRouter)
}
