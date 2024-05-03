import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";


class IsUserEmailNotExisting{
    public emailExists = async ({body}: Request, res: Response, next: NextFunction) => {

        const userEmail =  body.email
        
        const currentUser = await prisma.user.findFirst({where: {email: userEmail}});
        
        if(!currentUser){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Use not exists"); 
        }
        
        return next();
    }
}
export const isUserEmailNotExisting = new IsUserEmailNotExisting();