import { Request, Response } from "express";
import { getRepository } from "typeorm";
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
      const user: User = req.body;
      console.log("Inserting a new user into the database :");
      const createdUser = new User();
      createdUser.name = user.name;
      createdUser.email = user.email;
      createdUser.password = user.password;
      createdUser.createdAt = new Date();

      const userRepository = getRepository(User);
      try {
        await userRepository.save(createdUser);
      } catch (e) {
        res.status(409).send('Sorry, this username already exists');
        return;
      }
      res.status(201).send('User created');
   };
  

}

export default UserController;