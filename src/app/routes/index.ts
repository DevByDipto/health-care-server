import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';


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
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;