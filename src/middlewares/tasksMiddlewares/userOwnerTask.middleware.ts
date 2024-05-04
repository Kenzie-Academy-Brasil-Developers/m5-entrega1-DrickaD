import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error/appError";
import { prisma } from "../../database/prisma";
import { status } from "../../utils/HTTP.statusCode";

class UserOwnerTaks{
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        //Usuário da token é o proprietario de alguma task, getOne, update e delete - rota de task
        const {currentTask} = res.locals;
        const {currentUser} = res.locals;   
        
        const taskOne = await prisma.task.findFirst({
            where:{
                id: Number(currentTask.id), 
                userId: Number(currentUser.id)
        }});
 
        if(!taskOne){
            throw new AppError(status.HTTP_403_FORBIDEN, "This user is not the task owner")
        }

        res.locals = {...res.locals, taskOne}


        return next();
    };
}

export const userOwnerTask = new UserOwnerTaks();