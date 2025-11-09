import { User, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from 'bcrypt';
import { jwtHelper } from "../../helper/jwtHelper";
const login = async (payload:User) => {

     const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }

    const userToken = jwtHelper.creatToken(user);
    // Implement login logic here
    return { 
       userToken,
       user,
         needPasswordChange: user.needPasswordChange
     };
}

export const AuthService = {
    login
}