import { Router } from 'express'
import { verifyToken } from '../../../middlewares/token';
import { verifyUser } from '../../../middlewares/user';
import UserController from './user.controller';



const user = Router();

user.get('/', UserController.getAllUsers);
user.get('/:id', UserController.getUserById);
user.post('/', UserController.newUser);
user.delete('/:id', [verifyToken, verifyUser], UserController.deleteUser);


export default user;