import { NextFunction, Request, Response } from "express";
import { status } from "../utils/HTTP.statusCode";
import { AppError } from "../error/appError";

class UserIdBodyOwnerToken{
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;    
        const currentUseId = Number(currentUser.id);
        const userId = Number(req.body.userId);
    
        if(currentUseId !== userId){
            throw new AppError(status.HTTP_403_FORBIDEN, "You dont have permission to perform this action")
        }

        return next();
    };

}

export const userIdBodyOwnerToken = new UserIdBodyOwnerToken();