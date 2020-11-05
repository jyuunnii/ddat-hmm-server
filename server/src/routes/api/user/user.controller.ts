import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entity/User";


export class UserController {
  public static getAllUsers = async (req: Request, res: Response) => {
    const userRepository: Repository<User> = await getRepository(User);
    try {
      const users = await userRepository
        .createQueryBuilder('user')
        .getMany(); 
        // 주요정보는 빼고 리턴하도록 수정

      res.send(users);
    } catch (e) {
      res.status(404).send();
    }
  };

  public static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository: Repository<User> = await getRepository(User);
    try {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();
       
      if(user){
        res.status(200).json({
          id : user.id,
          name : user.name,
          profileImageUri : user.profileImageUri,
          backgroundImageUri : user.backgroundImageUri,
          comment: user.comment       
        });
      }else{
        res.status(404).send('User not found');
      }
    } catch (e) {
      res.status(404).send('User not found');
    }
  };

  public static newUser = async (req: Request, res: Response) => {
      const {name, email, password} = req.body;
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      // const duplicated = await validate(user);
      // if(duplicated.length > 0){
      //   res.status(400).send(duplicated);
      //   return;
      // }            valideate 함수........검색

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
    const userRepository: Repository<User> = await getRepository(User);
    try {
      await userRepository.findOneOrFail(id);
    } catch (e) {
      res.status(404).send(e);
    }
    await userRepository.delete(id);
    res.status(200).send('User deleted!');
  };

  public static updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {name, comment} = req.body;

    const userRepository: Repository<User> = await getRepository(User);
    try {
      let user = await userRepository.findOne(id);
      user.name = name;
      user.comment = comment;
      
      await userRepository.save(user);
      res.status(201).send('User data updated!')
    } catch (e) {
      res.status(404).send(e);
    }
  }
}

export default UserController;
