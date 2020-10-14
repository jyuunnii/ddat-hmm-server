import { Router } from 'express'
import auth from './auth';
import user from './user'

const routes = Router();

routes.use('/user', user);
routes.use('/auth', auth);

export default routes;