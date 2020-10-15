import { Router } from 'express'
import UserController from './user.controller';



const user = Router();

user.get('/', UserController.getAllUsers);
user.get('/:id', UserController.getUserById);
user.post('/', UserController.newUser);
user.delete('/:id', UserController.deleteUser);


export default user;