import { Router } from 'express'
import { verifyToken } from '../../../middlewares/token';
import { verifyUser } from '../../../middlewares/user';
import { MessageController } from './message.controller';

const message = Router();

message.get('/:id', [verifyToken, verifyUser], MessageController.getMessagesById);
message.post('/', MessageController.sendMessage);



export default message;