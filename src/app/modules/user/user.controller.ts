import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

// const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

//     const {page, limit,searchTerm,sortBy,sortOrder,role,status} = req.query;
// const filters= {searchTerm,role,status}
// const options = {page,limit,sortBy,sortOrder}

// // console.log(req.query);
// // console.log("status",status);
// // console.log(options);

//     const result = await UserService.getAllFromDB(filters,options);

//     sendResponse(res, {
//         statusCode: 201,
//         success: true,
//         message: "user retrive successfully!",
//         data: result
//     })
// })

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

     const filters = pick(req.query, ["status", "role", "email", "searchTerm"]) // searching , filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // aladha bananor shubidha kii holo ?? 
// console.log(filters, {options});

   const result = await UserService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "user retrive successfully!",
        data: result
    })
})


export const UserController = {
    createPatient,
    getAllFromDB
}