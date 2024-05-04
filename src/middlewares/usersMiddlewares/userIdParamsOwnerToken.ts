import { NextFunction, Request, Response} from "express";
import { UserAutoLoginBodySchema } from "../../schemas";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class UserIdParamsOwnerToken{
        public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;
        const {id} = req.params;
        const userId = id;

        if(currentUser.id !== userId){
            throw new AppError(status.HTTP_403_FORBIDEN, "You dont have permission to perform this action")
        }

        const user = await prisma.user.findFirst({where:{id: Number(userId)}});

        const userOwnerId = UserAutoLoginBodySchema.parse(user);

        res.locals = {
            ...res.locals, userOwnerId
        };

        return next();
    }; 
}

export const userIdParamsOwnerToken = new UserIdParamsOwnerToken();