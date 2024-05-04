import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class IsTaskIdValid{
    public execute = async ({params}: Request, res: Response, next: NextFunction): Promise<void> => {
        const taskId =  Number(params.id); 

        const currentTask = await prisma.task.findFirst({
            where: {id: taskId},
        });
        
        if(!currentTask){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Task not found.");
        };
        res.locals = {...res.locals, currentTask};
        return next();
    }
 
}

export const isTaskIdValid = new IsTaskIdValid();