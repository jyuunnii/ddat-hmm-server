import { Router } from 'express'
import auth from './api/auth';
import user from './api/user';

const routes = Router();

routes.use('/user', user);
routes.use('/auth', auth);

export default routes;