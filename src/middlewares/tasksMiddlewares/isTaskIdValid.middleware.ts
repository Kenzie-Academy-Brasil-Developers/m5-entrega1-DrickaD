import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";

class IsTaskIdValid{
    public idExists = async ({params}: Request, res: Response, next: NextFunction) => {
        const taskId =  Number(params.id);      
        const currentTask = await prisma.task.findFirst({where: {id: taskId}});
        if(!currentTask){
            throw new AppError(404, "Task not found.");
        };
        res.locals = {currentTask};
        return next();
    }
}

export const isTaskIdValid = new IsTaskIdValid();