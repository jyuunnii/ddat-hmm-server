import { NextFunction, Request, Response } from 'express'
import jwt = require("jsonwebtoken");


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const request_token = req.headers['x-access-token'] || req.query.token;
    let jwtPayload

    if(!request_token){
        return res.status(403).send('Token misising');
    }
    try{
        jwtPayload = await jwt.verify(request_token, req.app.get('jwt-secret')) as any;
        res.locals.jwtPayload = jwtPayload;
    }catch(e){
        res.send("Invalid token");
        return;
    }

    const {userId, userEmail} = jwtPayload;
    const newToken = jwt.sign({userId, userEmail}, req.app.get('jwt-secret'),{expiresIn : '1h',});
    res.setHeader('token', newToken)

    next()
} 