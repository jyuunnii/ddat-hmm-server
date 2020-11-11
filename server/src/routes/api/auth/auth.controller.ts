import { Request, RequestHandler, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entity/User";
import jwt = require("jsonwebtoken");



export class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("Invalid email or invalid passwords");
        }

        const userRepository: Repository<User> = await getRepository(User);
        let user: User;
        try {
          const user = await userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email }) //db에서 unique 하게 관리필요
            .getOne();

            if(user){
              if (!user.isPasswordCorrect(password)) {
                return res.status(401).send("Password error");
              }

              const userInfo = {id: user.id};
              const options = {expiresIn: "1h", issuer: "hmm", subject: "userInfo"};            
              const token = await jwt.sign(userInfo, req.app.get('jwt-secret'), options);
              
              res.status(200).json({
                id: user.id,
                token: token});
            }else{
              res.status(401).send("Account doesn't exist")
            }
        } catch (e) {
            res.status(409).send(e) //error status 변경 server internal error
        }
    };
};

export default AuthController;

