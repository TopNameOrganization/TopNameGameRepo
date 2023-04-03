import { Router } from 'express';
import { topicRoutes } from './forumTopic';

const router: Router = Router();
topicRoutes(router);

export default router;
