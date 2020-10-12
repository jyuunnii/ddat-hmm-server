import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";


export class UserController {

   public static listAll = async (req: Request, res: Response) => {
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
  

   public static newUser = async (req: Request, res: Response) => {

      //const user: User = req.body;

      const createdUser = new User();
      createdUser.name = "test";
      createdUser.email = "test@";
      createdUser.password = "test";
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
  

}

export default UserController;