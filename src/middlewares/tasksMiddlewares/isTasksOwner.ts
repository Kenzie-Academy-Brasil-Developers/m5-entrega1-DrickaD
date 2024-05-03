import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";

class IsTasksOwner{
    public listsTaksOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {currentUser} = res.locals; 
        
        const tasksUser = await prisma.task.findMany({
        where: {userId: Number(currentUser.id)}});

        if(!tasksUser){
            throw new AppError(404, "Tasks not found.");
        };

        res.locals = {...res.locals, tasksUser};

        return next();

    }
}
export const isTasksOwner = new IsTasksOwner();