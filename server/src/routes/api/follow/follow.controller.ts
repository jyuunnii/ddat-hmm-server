import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Friend } from "../../../entity/Friend";

export class FollowController {
    public static follow = async(req: Request, res: Response) => {
        const {followerId, followed} = req.body;
        const new_friend = new Friend();
        new_friend.followerId = followerId;
        new_friend.followed = followed;
    
        const friendRepository: Repository<Friend> = await getRepository(Friend);
        try {
          await friendRepository.save(new_friend);
        } catch (e) {
          res.status(409).send(e);
          return;
        }
        res.status(201).send('Followed !');
      }
}