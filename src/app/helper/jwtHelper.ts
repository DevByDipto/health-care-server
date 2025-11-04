import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const creatToken = (user:User) => {
const accessToken = jwt.sign({ email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: '1d' });


 const refreshToken = jwt.sign({ email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: '90d' });


return {
    accessToken,
    refreshToken
}
}

 

 const verifyToken = (token:string) => {
  return jwt.verify(token, config.jwt_secret as string) as JwtPayload;
};

export const jwtHelper = {
  creatToken,
  verifyToken,
};