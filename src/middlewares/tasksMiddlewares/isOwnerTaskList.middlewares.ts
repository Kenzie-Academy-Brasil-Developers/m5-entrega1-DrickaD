import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";
import { BodyGetTasksSchema } from "../../schemas";

class IsOwnerTaskList{
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {categoryUser} = res.locals;
        const {currentUser} = res.locals;

        if(!categoryUser){ 
            const taskListUser = await prisma.task.findMany({
            where: {userId: Number(currentUser.id)}});
    
            if(!taskListUser){
                throw new AppError(status.HTTP_404_NOT_FOUND, "Tasks not found.");
            };
           
            res.locals = {...res.locals, taskListUser};
            return next();
        }

        const taskListUser = await prisma.task.findMany({
        where: {userId: Number(currentUser.id), categoryId: Number(categoryUser.id)},
        include: {category: true}
        });

        if(!taskListUser){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Tasks not found.");
        };

        res.locals = {...res.locals, taskListUser};
        return next();
    }
}
export const isOwnerTaskList = new IsOwnerTaskList();