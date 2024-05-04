import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error/appError";
import { status } from "../../utils/HTTP.statusCode";

class UserOwnerCategory{
    public userOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        //categoria pertence ao usuário da token? rota post de task
        const {currentCategoryBody} = res.locals; //categoria com o id do body

        if(!currentCategoryBody){
            return next();
        }

        const {userId} = currentCategoryBody;

        const {currentUser} = res.locals;    
        const currentUseId = Number(currentUser.id);

        const compare = userId === currentUseId
     
        if(!compare){
            throw new AppError(status.HTTP_403_FORBIDEN, "This user is not the category owner")
        }

        return next();
    };

   
};

export const userOwnerCategoryBody = new UserOwnerCategory();