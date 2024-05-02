import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../error/appError';
import { status } from '../../utils/HTTP.statusCode';
import { jwConfig } from '../../config/auth.config';
import { prisma } from '../../database/prisma';
import { UserAutoLoginBodySchema } from '../../schemas';


class AuthTokenMiddleware {
    public isAuthenticated = (req: Request, res: Response, next: NextFunction): void =>{
        const {authorization} = req.headers;
        
        if(!authorization){
            throw new AppError(status.HTTP_401_UNAUTHORIZED, "Token is riquerid");
        };

        const [_prefix, token] = authorization.split(" ");
        const {secret} = jwConfig();
        const decoded = verify(token, secret);

        res.locals = {
            ...res.locals, decoded,
        };

        return next();
    };

    public isRecourceOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {decoded} = res.locals;
        const {userId} = req.params;

        if(decoded.subject !== userId){
            throw new AppError(status.HTTP_403_FORBIDEN, "You dont have permission to perform this action")
        }

        const user = await prisma.user.findFirst({where:{id: Number(userId)}});

        const currentUser = UserAutoLoginBodySchema.parse(user);

        res.locals = {
            ...res.locals, currentUser
        };

        return next();
    };
};

export const authToken = new AuthTokenMiddleware();