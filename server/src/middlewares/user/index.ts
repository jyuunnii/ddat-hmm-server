import { NextFunction, Request, Response } from 'express'

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = res.locals.jwtPayload.id;
    if (currentUserId === Number(req.params.id)) {
      next();
    } else {
      res.status(401).send()
      return
    }
}
  