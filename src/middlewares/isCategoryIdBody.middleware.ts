import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../error/appError";

class IsCategoryIdBody{
    public idExists = async (req: Request, res: Response, next: NextFunction) => {
        const idCategory =  Number(req.body.categoryId);     
        const currentCategory = await prisma.task.findFirst({
            where: {category: {id: idCategory}},
            include:{category: true}});

        if(!currentCategory){
            throw new AppError(404, "Category not found.");
        };
        res.locals.categoryCurrent = currentCategory;
        return next();
    }
}
export const isCategoryIdBody = new IsCategoryIdBody();