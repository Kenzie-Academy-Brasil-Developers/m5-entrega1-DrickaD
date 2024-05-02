import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";
import { JsonWebTokenError } from "jsonwebtoken";
import { status } from "../utils/HTTP.statusCode";

export class HandleErrors{
    public static execute =
    (error: Error, req: Request, res: Response, next: NextFunction) : Response => {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message});
        }

        if(error instanceof ZodError){
            return res.status(status.HTTP_400_BAND_REQUEST).json({errors: error.errors});
        } 

        if(error instanceof JsonWebTokenError){
            return res.status(status.HTTP_401_UNAUTHORIZED).json({message: error.message})
         }

        console.log(error)
        return res.status(500).json({error: "Internal server error."});

    }
}
export const handleErrors = HandleErrors.execute;
