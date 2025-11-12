import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';



const accessToken =(user:User)=>{ 

 return jwt.sign({ email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: '1d' });
 }


 const refreshToken =(user:User)=>{
return jwt.sign({ email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: '90d' });
}

 

 const verifyToken = (token:string) => {
  return jwt.verify(token, config.jwt_secret as string) as JwtPayload;
};

export const jwtHelper = {
   accessToken,
    refreshToken,
  verifyToken,
};