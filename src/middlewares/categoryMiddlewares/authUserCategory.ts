import { AppError } from '../../error/appError';
import { status } from '../../utils/HTTP.statusCode';
import { prisma } from '../../database/prisma';
import { Request, Response, NextFunction } from "express";

export class AuthUserCategory{
    public idCategoryUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;
        const category = await prisma.category.findFirst({where:{userId: Number(currentUser.id)}});
    
        if(!category){
            throw new AppError(status.HTTP_403_FORBIDEN, "You dont have permission to perform this action")
        }
    
        res.locals = {
            ...res.locals, category
        };
    
        return next();
    };
};

export const authUserCategory = new AuthUserCategory();


