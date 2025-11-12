import { User, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from 'bcrypt';
import { jwtHelper } from "../../helper/jwtHelper";
import { Secret } from "jsonwebtoken";
import config from "../../../config";


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

    const accessToken = jwtHelper.accessToken(user)
    const refreshToken = jwtHelper.refreshToken(user)
    // Implement login logic here
    return { 
       accessToken,
       refreshToken,
       user,
         needPasswordChange: user.needPasswordChange
     };
}

const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelper.verifyToken(token);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    });

    const accessToken = jwtHelper.accessToken(userData)


    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };

};


const changePassword = async (user: any, payload: any) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, Number(config.salt_round));

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false // keno dilam(support)
        }
    })

    return {
        message: "Password changed successfully!"
    }
};


const getMe = async (session: any) => {
     // aii route aito others info gulo add kore akbare pathai dite partam tahole aldha kore abar user endpoint e me endpoint keno banano holo ? (support)
     
    const accessToken = session.accessToken;
    const decodedData = jwtHelper.verifyToken(accessToken);

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    })

    const { id, email, role, needPasswordChange, status } = userData;

    return {
        id,
        email,
        role,
        needPasswordChange,
        status
    }

}

export const AuthService = {
    login,
    refreshToken,
    changePassword,
    getMe
}