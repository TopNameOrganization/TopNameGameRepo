import { Router } from 'express'
import { topicRoutes } from './forumTopic'
import { messageRoutes } from './forumMessage'
import { themeRoutes } from './theme'

const router: Router = Router()
topicRoutes(router)
messageRoutes(router)
themeRoutes(router)

export default router
