import { Request, RequestHandler, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../../entity/User";
import jwt = require("jsonwebtoken");



export class AuthController {
    public static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("Invalid email or invalid passwords");
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
          user = await userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

            if(user){
              if (!user.isPasswordCorrect(password)) {
                return res.status(401).send("Password error");
              }

              const userInfo = {userId: user.id, userEmail: user.email};
              const options = {expiresIn: "1h", issuer: "hmm", subject: "userInfo"};            
              const token = await jwt.sign(userInfo, req.app.get('jwt-secret'), options);
              res.status(200).json({token:token});
            }else{
              res.status(401).send("Account doesn't exist")
            }
        } catch (e) {
            res.status(401).send(e)
        }
    };
};

export default AuthController;

