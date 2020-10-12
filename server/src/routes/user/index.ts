import { Router } from 'express'
import { unwatchFile } from 'fs';
import UserController from '../../controller/UserController'


const user = Router();

user.get('/:email', UserController.getUserByEmail);
user.post('/signup', UserController.newUser);


export default user;