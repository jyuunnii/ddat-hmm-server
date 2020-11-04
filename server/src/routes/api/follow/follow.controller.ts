import { Request, Response } from "express";
import { Brackets, getRepository, Repository } from "typeorm";
import { Friend } from "../../../entity/Friend";
import { User } from "../../../entity/User";

export class FollowController {
  public static getFriendsById = async(req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    try {
        const followed = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friend')
        .where('user.id = :id', { id })
        .distinct(true)
        .getMany()

        const follower = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.friends', 'friend')
        .where('friend.followerId = :id', { id })
        .distinct(true)
        .getMany()


        let followerList = [];
        let followedList = [];
        Promise.all([
          await followed.map(user => {
            followedList.push({
              id: user.id,
              name: user.name,
              profileImageUri: user.profileImageUri,
              backgroundImageUri: user.backgroundImageUri,
              friends: user.friends
            })
          }),
          await follower.map(user => {
            followerList.push({
              id: user.id,
              name: user.name,
              profileImageUri: user.profileImageUri,
              backgroundImageUri: user.backgroundImageUri,
              friends: user.friends
            })
          })
        ]);
        res.status(200).json({
          follower: followerList,
          followed: followedList
        });
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
        .where('user.id = :id AND friend.followerId = :fid', {id: followed.id, fid: followerId})
        .getOne();

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