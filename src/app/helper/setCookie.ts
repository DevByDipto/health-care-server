import { Response } from "express";
import { UserToken } from "../modules/auth/auth.interface";

export const setCookie = (res:Response, userToken:UserToken)=>{
if(userToken.accessToken){
    res.cookie('accessToken', userToken.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}

if(userToken.refreshToken){
    res.cookie('refreshToken', userToken.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
}
}