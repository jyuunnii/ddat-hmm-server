import { Router } from 'express'
import { FollowController } from './follow.controller';



const follow = Router();

follow.post('/', FollowController.follow);



export default follow;