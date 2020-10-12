import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";


export class UserController {
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
}

export default UserController;