import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../error/appError";

class IsCategoryNameQuery{
    public nameExists = async ({query}: Request, res: Response, next: NextFunction) => {
        const category = query.category;

        if(!category){
            return next();
        } 

        const nameCategory =  String(category);
        const currentCategory = await prisma.category.findFirst({where: {name: nameCategory}});
    
        if(!currentCategory){
            throw new AppError(404, "Category not found.");
        };

        res.locals.categoryCurrent = currentCategory;

        return next();

    }
}
export const isCategoryNameQuery = new IsCategoryNameQuery();