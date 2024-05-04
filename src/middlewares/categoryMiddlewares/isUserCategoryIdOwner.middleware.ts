import { NextFunction, Request, Response} from "express";
import { prisma } from "../../database/prisma";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class IsUserCategoryIdOwner{
    public execute = async ({params}: Request, res: Response, next: NextFunction) => {
        const {currentUser} = res.locals;
        const {currentCategory} = res.locals;
        
        const category = await prisma.category.findFirst({
            where:{
                id: Number(currentCategory.id),
                userId: Number(currentUser.id)
            }});

        if(!category){
            throw new AppError(status.HTTP_403_FORBIDEN, "This is not the category owner");
        };

        return next();
    }
}

export const isUserCategoryIdOwner = new IsUserCategoryIdOwner();