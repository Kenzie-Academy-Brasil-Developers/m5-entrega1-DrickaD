import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";


class IsUserEmailExisting{
    public registeredEmail = async ({body}: Request, res: Response, next: NextFunction) => {
        const userEmail =  String(body.email)
        const currentUser = await prisma.user.findFirst({where: {email: userEmail}});
        
        if(currentUser){
            throw new AppError(status.HTTP_409_CONFLIT, "This e-mail is already registered."); 
        }
        
        return next();
    }

    public userNotFound = async ({body}: Request, res: Response, next: NextFunction) => {
        const userEmail =  body.email
        
        const currentUser = await prisma.user.findFirst({where: {email: userEmail}});
        
        if(!currentUser){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Use not exists"); 
        }
        
        return next();
    }
}
export const isUserEmailExisting = new IsUserEmailExisting();