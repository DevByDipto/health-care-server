import express from 'express'
import { ReviewController } from './review.controller';
import { UserRole } from '@prisma/client';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/', ReviewController.getAllFromDB);
router.post(
    '/',
    auth(UserRole.PATIENT),
    ReviewController.insertIntoDB
);


export const ReviewRoutes = router;