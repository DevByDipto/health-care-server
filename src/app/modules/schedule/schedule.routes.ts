import express from "express";
import { UserRole } from "@prisma/client";
import { ScheduleController } from "./schedule.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.DOCTOR),
    ScheduleController.schedulesForDoctor
)

router.post(
    "/",
    ScheduleController.insertIntoDB 
)


// router.delete(
//     "/:id",
//     ScheduleController.deleteScheduleFromDB
// )
export const ScheduleRoutes = router;