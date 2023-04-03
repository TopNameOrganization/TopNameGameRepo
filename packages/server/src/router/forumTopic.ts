import { Router } from 'express';
import { ForumTopicAPI } from '../controllers/forumTopic.controller';

export const topicRoutes = (router: Router) => {
  const topicRouter: Router = Router();

  topicRouter
    .get('/', [], ForumTopicAPI.find)
    .get('/all', [], ForumTopicAPI.findAll)
    .post('/', [], ForumTopicAPI.createOrUpdate);

  router.use('/api/forum', topicRouter);
}
