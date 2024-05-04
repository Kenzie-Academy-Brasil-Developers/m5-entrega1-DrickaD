import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../error/appError';
import { status } from '../utils/HTTP.statusCode';
import { jwConfig } from '../config/auth.config';
import { prisma } from '../database/prisma';
import { UserAutoLoginBodySchema } from '../schemas';



class AuthTokenMiddleware {
    public isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {authorization} = req.headers;
       
        if(!authorization){
            throw new AppError(status.HTTP_401_UNAUTHORIZED, "Token is riquerid");
        };
        
        const [_prefix, token] = authorization.split(" ");

        const {secret} = jwConfig();
        const decoded = verify(token, secret);

        const userId = Number(decoded.sub);
     
        const user = await prisma.user.findFirst({where:{id: Number(userId)}});

        const currentUser = UserAutoLoginBodySchema.parse(user);
        
        res.locals = {
            ...res.locals, currentUser
        };

        return next();
    };
};

export const authToken = new AuthTokenMiddleware();