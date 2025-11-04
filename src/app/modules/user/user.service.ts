import { Request } from "express";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../shared/prisma"; // dui prismar moddhe parthoko ??
import { Prisma } from "@prisma/client";
import { userSearchableFields } from "./user.constant";

const createPatient = async (req: Request) => {

    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.patient.profilePhoto = uploadResult?.secure_url
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;
}

// { AND: [ { OR: [Array] }, { AND: [Array] } ] }

//////

// {
//   OR: [ { email: [Object] } ], AND: [ { role: 'PATIENT' }, { status: 'ACTIVE' } ]
// }

// const getAllFromDB = async (filters, options: IOptions) => {
//     const { skip, limit, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
//     const { searchTerm, ...filterData } = filters
//     const userSearchableFields = ["email"]
//     let addCondition = []
//     let addFilter = []
//     let whereObject;

//     // let OR = []

//     if (searchTerm) {
//         addCondition = userSearchableFields.map((field) => {
//             return {


//                 [field]: {
//                     contains: searchTerm,
//                     mode: 'insensitive'
//                 }
//             }
//         })
//     }

//     if (filterData) {

//         for (const key in filterData) {
//             addFilter.push({ [key]: filterData[key] })
//         }
//     }



//     if (addCondition.length > 0) {
//         whereObject ={ AND:[ {OR: addCondition}, {AND:addFilter} ] }
//     }

//     console.log(whereObject);

//     const user = await prisma.user.findMany({
//         skip,
//         take: limit,

//         where: whereObject,
//         orderBy: { [sortBy]: sortOrder }
//     });
//     return user;
// }


const getAllFromDB = async (params: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options) 
    const { searchTerm, ...filterData } = params;
 
    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }
// console.log(andConditions);

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}
// console.log(whereConditions);

    const result = await prisma.user.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.user.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

export const UserService = {
    createPatient,
    getAllFromDB
}