import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { setCookie } from "../../helper/setCookie";
import httpStatus from 'http-status'

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await AuthService.login(req.body);
    const { accessToken, refreshToken, needPasswordChange, user } = result;
    const userToken = {
        accessToken,
        refreshToken
    }
    setCookie(res, userToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Patient logged in successfully",
        data: {
            needPasswordChange,
            user,
        },
    });
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);
const userToken={
   accessToken: result.accessToken
}
    setCookie(res,userToken )

 

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token genereated successfully!",
        data: {
            message: "Access token genereated successfully!",
        },
    });
});

const changePassword = catchAsync(
    async (req: Request & { user?: any }, res: Response) => {
        const user = req.user;

        const result = await AuthService.changePassword(user, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Password Changed successfully",
            data: result,
        });
    }
);

const getMe = catchAsync(async (req: Request, res: Response) => {
    const userSession = req.cookies;
    const result = await AuthService.getMe(userSession);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrive successfully!",
        data: result,
    });
});
export const AuthController = {
    login,
    refreshToken,
    changePassword,
    getMe
}