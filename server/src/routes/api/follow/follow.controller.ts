import { Request, Response } from "express";
import { Brackets, getRepository, Repository } from "typeorm";
import { Friend } from "../../../entity/Friend";
import { User } from "../../../entity/User";

export class FollowController {
  public static getFriendsById = async(req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
  
    try {
        const follower = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.following', 'friend')
        .where('friend.followingId = :id',{id: id})
        .getMany();

        const following= await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect(Friend, 'friend', 'friend.followingId = user.id')
        .where('friend.user.id = :id', {id: id})
        .getMany()
  
        let followerPublic = [];
        let followingPublic = [];
        Promise.all([
          await follower.map(user => {
            followerPublic.push({
              id: user.id,
              name: user.name,
              comment: user.comment,
              profileImageUri: user.profileImageUri,
              backgroundImageUri: user.backgroundImageUri
            })
          }),
          await following.map(user => {
            followingPublic.push({
              id: user.id,
              name: user.name,
              comment: user.comment,
              profileImageUri: user.profileImageUri,
              backgroundImageUri: user.backgroundImageUri
            })
          })
        ]);
        res.status(200).json({
          following: followingPublic,
          follower: followerPublic
        });
    } catch (e) {
      res.status(404).send('User not found');
    }
  }

  public static followByName = async(req: Request, res: Response) => {
    const id = req.params.id;
    const {followingName} = req.body;

    const userRepository: Repository<User> = await getRepository(User);
    const friendRepository: Repository<Friend> = await getRepository(Friend);
    try {
        const following = await userRepository
        .createQueryBuilder('user')
        .where('user.name = :name', {name: followingName})
        .getOne();

        const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();

        // const friend = await friendRepository
        // .createQueryBuilder('friend')
        // .leftJoinAndSelect('friend.followed', 'user')
        // .where('user.id = :id AND friend.followerId = :fid', {id: id, fid: follower.id})
        // .getOne();

        // if(friend){
        //   res.send('Already followed');
        //   return;
        // }

        const newFriend = new Friend();
        newFriend.followingId = following.id;
        newFriend.user = user;
        
        await friendRepository.save(newFriend);
        res.status(201).send('New followed !');
    } catch (e) {
      res.status(409).send(e);
    }
  }

  public static unfollowByName = async(req: Request, res: Response) => {
    const id = req.params.id;
    const {followingName} = req.body;
    const friendRepository: Repository<Friend> = await getRepository(Friend);
    const userRepository: Repository<User> = await getRepository(User);
    try {
      const fid = await userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', {name: followingName})
      .getOne()

      const friend = await friendRepository
      .createQueryBuilder('friend')
      .leftJoinAndSelect('friend.user', 'user')
      .where('user.id = :id AND friend.followingId = :fid', {id: id, fid: fid.id})
      .getOne();
      
      await friendRepository.delete(friend.id);
      res.status(201).send('Unfollow')
    } catch (e) {
      res.status(404).send(e);
    }
  }
}