import { compare, hash } from 'bcryptjs';
import { prisma } from "../database/prisma";
import { TBodyCreateUser, TLoginUserBody, TReturnBodyUser, TReturnbodyUserLogin } from "../interfaces";
import { ReturnBodyUserLoginSchema, ReturnBodyUserSchema } from "../schemas";
import { injectable } from 'tsyringe';
import { AppError } from '../error/appError';
import { status } from '../utils/HTTP.statusCode';
import { jwConfig } from '../config/auth.config';
import { sign } from 'jsonwebtoken';

@injectable()
export class UserServices{
    public register = async (body: TBodyCreateUser): Promise<TReturnBodyUser> =>{
        body.password = await hash(body.password, 10);

        const user = await prisma.user.create({data: body});
        const newUser = ReturnBodyUserSchema.parse(user);
        return newUser;
    };

    public login = async (body: TLoginUserBody): Promise<TReturnbodyUserLogin> => {
        const user = await prisma.user.findFirst({where:{email: body.email}});

        if(!user){
            throw new AppError(status.HTTP_401_UNAUTHORIZED,"Email and password doesn't match")
        }

        const passwordMatch = await compare(body.password, user.password)

        if(!passwordMatch){
            throw new AppError(status.HTTP_401_UNAUTHORIZED, "Email and password doesn't match")
        }

        const {secret, expiresIn} = jwConfig();

        const accessToken = sign({id: user.id}, secret, {
            expiresIn: expiresIn,
            subject: user.id.toString() 
        });
 
        const foundUser = {accessToken, user};

        const loginUser = ReturnBodyUserLoginSchema.parse(foundUser);

        return loginUser;
    } 
}
