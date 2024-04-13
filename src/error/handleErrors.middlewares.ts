import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";

export class HandleErrors{
    public static execute =
    (error: Error, req: Request, res: Response, next: NextFunction) : Response => {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }
        else if(error instanceof ZodError){
            return res.status(400).json({errors: error.errors});
        } 
        else {
            console.log(error)
            return res.status(500).json({error: "Internal server error."});
        }
    }
}
export const handleErrors = HandleErrors.execute;
