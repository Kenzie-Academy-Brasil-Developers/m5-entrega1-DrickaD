import { Request, Response, NextFunction } from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class IsCategoryIdParams{
    public idExists = async ({params}: Request, res: Response, next: NextFunction) => {
        const categoryId =  Number(params.id);

        const currentCategory = await prisma.category.findFirst({
            where: {id: categoryId}
        });
        
        if(!currentCategory){
            throw new AppError(status.HTTP_404_NOT_FOUND, "Category not found.");
        };
        res.locals = {...res.locals, currentCategory};
        return next();
    }
}
export const isIdCategoryParams = new IsCategoryIdParams();