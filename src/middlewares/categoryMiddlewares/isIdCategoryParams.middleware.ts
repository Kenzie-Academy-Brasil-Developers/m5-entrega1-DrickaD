import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";

class IsCategoryIdParams{
    public idExists = async ({params}: Request, res: Response, next: NextFunction) => {
        const categoryId =  Number(params.id);
        const currentCategory = await prisma.category.findFirst({where: {id: categoryId}});
        if(!currentCategory){
            throw new AppError(404, "Category not found.");
        };
        res.locals.categoryCurrent = currentCategory;
        return next();
    }
}
export const isIdCategoryParams = new IsCategoryIdParams();