import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";

class IsCategoryIdBodyExists{
    public execute = async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
        if(!req.body.categoryId){
            return next();
        }
        
        const idCategory =  Number(req.body.categoryId);   
          
        const currentCategoryBody = await prisma.category.findFirst({
            where:{id: idCategory}
        });

        if(!currentCategoryBody){
            throw new AppError(404, "Category not found.");
        };
        
        res.locals= {...res.locals, currentCategoryBody};

        return next();
    }
}
export const isCategoryIdBodyExists = new IsCategoryIdBodyExists();
