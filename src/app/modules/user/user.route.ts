import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { fileUploader } from "../../helper/fileUploader";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = Router();

router.get(
    "/",
    auth(UserRole.PATIENT),
    UserController.getAllFromDB
)

router.post(
    "/create-patient",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data))
        return UserController.createPatient(req, res, next)
    }

)


export  const userRoute =  router;