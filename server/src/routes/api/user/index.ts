import { Router } from 'express'
import { verifyToken } from '../../../middlewares/token';
import { verifyUser } from '../../../middlewares/user';
import UserController from './user.controller';



const user = Router();

user.get('/', UserController.getAllUsers);
user.get('/:id', [verifyToken, verifyUser], UserController.getUserById);
user.post('/', UserController.newUser);
user.post('/:id', [verifyToken, verifyUser], UserController.updateUser);
user.delete('/:id', [verifyToken, verifyUser], UserController.deleteUser);


export default user;