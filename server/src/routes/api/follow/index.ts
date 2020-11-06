import { Router } from 'express'
import { verifyToken } from '../../../middlewares/token';
import { verifyUser } from '../../../middlewares/user';
import { FollowController } from './follow.controller';



const follow = Router();

follow.get('/:id', [verifyToken, verifyUser], FollowController.getFriendsById);
follow.post('/:id', [verifyToken, verifyUser],  FollowController.followByName);
follow.delete('/:id', [verifyToken, verifyUser], FollowController.unfollowByName);


export default follow;