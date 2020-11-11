import { Router } from 'express'
import auth from './api/auth';
import follow from './api/follow';
import message from './api/message';
import user from './api/user';

const routes = Router();

routes.use('/user', user);
routes.use('/auth', auth);
routes.use('/message', message);
routes.use('/follow', follow);

export default routes;