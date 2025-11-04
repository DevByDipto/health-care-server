import { NextFunction, Request, Response } from "express"
import { jwtHelper } from '../helper/jwtHelper'
export const auth = (...roles) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken
            // console.log(token);

            if (!token) {
                throw new Error("You are not authorized!")
            }
            const verifyUser = jwtHelper.verifyToken(token)
            req.user = verifyUser

            if (roles.length && !roles.includes(verifyUser?.role)) {
                throw new Error("You are not authorized!")
            }
            
            next()
        } catch (error) {
            next(error)
        }

    }
}