import { Request, Response } from "express";
import { Brackets, getRepository, Repository } from "typeorm";
import { Friend } from "../../../entity/Friend";
import { User } from "../../../entity/User";

export class FollowController {
  public static getFriendsById = async(req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    try {
        const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friend')
        .where('user.id = :id', { id })
        .orWhere('friend.followerId = :id', { id })
        .distinct(true)
        .getMany()
      
      if(user){
        res.status(200).send(user);
      }else{
        res.status(404).send('User not found');
      }
    } catch (e) {
      res.status(404).send('User not found');
    }
  }
  

  public static followByFollowerId = async(req: Request, res: Response) => {
    const {followerId, followed} = req.body;
    const new_friend = new Friend();
    new_friend.followerId = followerId;
    new_friend.followed = followed;
    const friendRepository: Repository<Friend> = await getRepository(Friend);
    try {
        const friend = await friendRepository
        .createQueryBuilder('friend')
        .leftJoinAndSelect('friend.followed', 'user')
        .andWhere(new Brackets(sub => {
          sub.where('user.id = :id', {id: followed.id});
          sub.orWhere('friend.followerId = :id', {id: followerId})
        })).getOne();

        if(friend){
          res.send('Already followed');
          return;
        }

        await friendRepository.save(new_friend);
        res.status(201).send('New followed !');
    } catch (e) {
      res.status(409).send(e);
    }
  }
}