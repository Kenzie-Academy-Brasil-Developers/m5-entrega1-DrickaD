import { inject, injectable } from 'tsyringe';
import { Request, Response } from "express";
import { UserServices } from '../services/users.services';
import { status } from '../utils/HTTP.statusCode';

@injectable()
export class UserControllers{
    constructor(@inject("userServices") private userServices: UserServices){};

    public register = async (req: Request, res: Response) : Promise<Response> => {
        const task = await this.userServices.register(req.body);
        return res.status(status.HTTP_201_CREATED).json(task);
    }

    public login = async(req: Request, res: Response): Promise<Response> =>{
        const userLogin = await this.userServices.login(req.body);
        return res.status(status.HTTP_200_OK).json(userLogin); 
    }

    public autoLogin = async(req: Request, res: Response): Promise<Response>=>{
        const user = res.locals.currentUser
        return res.status(status.HTTP_200_OK).json(user);
    }
}
