import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.routes';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';
import { SpecialtiesRoutes } from '../modules/specialties/specialties.routes';


const router = express.Router();

const moduleRoutes = [
    
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
     {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;