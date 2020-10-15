import { Router } from 'express'
import AuthController from './auth.controller';


const auth = Router();

auth.post('/login', AuthController.login)
auth.post('/decoded', AuthController.decoded)

export default auth;