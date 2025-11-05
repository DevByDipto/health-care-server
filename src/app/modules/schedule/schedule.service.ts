import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import { parse, addMinutes, formatISO } from 'date-fns';
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (payload: any) => {
    let { startDate, endDate, startTime, endTime } = payload
    console.log({ startDate, endDate, startTime, endTime });
    const intervalTime = 30; // naming ta interval keno rakha hoise ?
    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)
 const schedules = [];

    const slotStartTime = new Date(`${startDate}T${startTime}:00`);

    let slotStartTimeUtcDate = new Date(slotStartTime.getTime() - slotStartTime.getTimezoneOffset() * 60000);
    const slotSEndTime = new Date(`${startDate}T${endTime}:00`);

    const slotEndTimeUtcDate = new Date(slotSEndTime.getTime() - slotSEndTime.getTimezoneOffset() * 60000);


    // console.log(slotStartTimeUtcDate);
    // console.log(slotEndTimeUtcDate);
    // console.log(slotEndTime);

    while (currentDate < lastDate) {

        while (slotStartTimeUtcDate < slotEndTimeUtcDate) {



            const slotEndTime = addMinutes(slotStartTimeUtcDate, 30);


             const scheduleData = {
                startDateTime: slotStartTimeUtcDate,
                endDateTime: slotEndTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })
// console.log(existingSchedule);

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedules.push(result)
            }


            slotStartTimeUtcDate = slotEndTime
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

// console.log(schedules);

    return schedules
}


const schedulesForDoctor = async (
    user: IJWTPayload,
    fillters: any,
    options: IOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } = fillters;

    const andConditions: Prisma.ScheduleWhereInput[] = [];

    if (filterStartDateTime && filterEndDateTime) {
        andConditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: filterStartDateTime
                    }
                },
                {
                    endDateTime: {
                        lte: filterEndDateTime
                    }
                }
            ]
        })
    }
 
    const whereConditions: Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}


    const doctorSchedules = await prisma.doctorSchedules.findMany({
        where: {
            doctor: {
                email: user.email
            }
        },
        select: {
            scheduleId: true
        }
    });

    const doctorScheduleIds = doctorSchedules.map(schedule => schedule.scheduleId);

    const result = await prisma.schedule.findMany({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.schedule.count({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        }
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

export const ScheduleService = {
    insertIntoDB,
    schedulesForDoctor, 
    // deleteScheduleFromDB
}