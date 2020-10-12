import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";


export class UserController {
  public static getAllUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository
        .createQueryBuilder('user')
        .getMany();

      res.send(users);
    } catch (error) {
      res.status(404).send();
    }
  };

  public static getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    const userRepository = getRepository(User);
    try {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();

      if(user){
        res.send(user);
      }else{
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

   public static newUser = async (req: Request, res: Response) => {
      const {name, email, password} = req.body;
      const createdUser = new User();
      createdUser.name = name;
      createdUser.email = email;
      createdUser.password = password;
      createdUser.createdAt = new Date();

      const userRepository: Repository<User> = await getRepository(User);
      try {
        await userRepository.save(createdUser);
      } catch (e) {
        res.status(409).send('Fail...\n');
        return;
      }
      res.status(201).send('User created !\n');
   };

   public static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    userRepository.delete(id);
    res.status(200).send('User deleted !\n');
  };
}

export default UserController;