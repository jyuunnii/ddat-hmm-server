import { Router } from 'express'
import UserController from '../../controller/UserController'


const user = Router();

user.get('/', UserController.listAll);
user.post('/signup', UserController.newUser);


export default user;