import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { setCookie } from "../../helper/setCookie";


const login =catchAsync(async (req:Request, res:Response,next:NextFunction) => {

    const result = await AuthService.login(req.body);
const {userToken,needPasswordChange} = result;
setCookie(res,userToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patient logged in successfully", 
        data: {
            needPasswordChange,
        },
    });
}) 



export const AuthController = {
    login
}