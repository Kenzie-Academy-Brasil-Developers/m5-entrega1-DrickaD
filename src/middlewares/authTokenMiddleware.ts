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
            ...res.locals, decoded, currentUser
        };

        return next();
    };

    public idParamsOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
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

    public idBodyOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;    
        const currentUseId = Number(currentUser.id);
        const userId = Number(req.body.userId);
    
        if(currentUseId !== userId){
            throw new AppError(status.HTTP_403_FORBIDEN, "You dont have permission to perform this action")
        }

        return next();
    };

    public userOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;    
        const currentUseId = Number(currentUser.id);
        const taskId = Number(req.params.id);

        const user = await prisma.user.findFirst({where:{id: currentUseId}});
        const task = await prisma.task.findFirst({where:{id: taskId}})
     
        if(task?.userId !== user?.id){
            throw new AppError(status.HTTP_403_FORBIDEN, "This user is not the task owner")
        }


        return next();
    };

    public userOwnerCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        const {currentUser} = res.locals;    
        const currentUseId = Number(currentUser.id);

        const taskId = Number(req.params.id);

        const user = await prisma.category.findFirst({where:{userId: currentUseId}});
     
        if(!user){
            throw new AppError(status.HTTP_403_FORBIDEN, "This user is not the category owner")
        }


        return next();
    };
};

export const authToken = new AuthTokenMiddleware();