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

  public static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
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
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.createdAt = new Date();
      user.hashPassword();

      const userRepository: Repository<User> = await getRepository(User);
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
      res.status(201).send('User created!');
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
    res.status(200).send('User deleted!');
  };
}

export default UserController;
