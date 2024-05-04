import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class IsCategoryNameQuery{
    public execute = async ({query}: Request, res: Response, next: NextFunction) => {
        const category = query.category;
        
        if(!category){
            return next();
        } 

        const {currentUser} = res.locals;
        
        const nameCategory =  String(category);
 
        const categoryUser = await prisma.category.findFirst({
        where: {
            userId: currentUser.id,
            name: {equals: nameCategory, mode:"insensitive"}
        }});

        if(!categoryUser){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Category not found.");
        };

        res.locals = {...res.locals, categoryUser}

        return next();

    }
}
export const isCategoryNameQuery = new IsCategoryNameQuery();