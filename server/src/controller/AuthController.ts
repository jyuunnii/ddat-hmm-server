import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";


export class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send();
        }
        const userRepository = getRepository(User);
        let user: User;
        try {
          user = await userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
        } catch (error) {
          res.status(401).send(error);
        }

        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
          res.status(401).send();
          return;
        }

        //TODO: 로그인 성공 후 token 이나 session key 발급
    };
  
}

export default AuthController;

