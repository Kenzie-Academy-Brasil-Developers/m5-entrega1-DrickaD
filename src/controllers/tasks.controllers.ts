import { Request, Response, query } from "express";
import { TasksServices} from "../services/index";
import { inject, injectable } from "tsyringe";
import { status } from '../utils/HTTP.statusCode';

@injectable()
export class TasksControllers{
    constructor(@inject("tasksServices") private tasksServices: TasksServices){};

    public createTask = async (req: Request, res: Response) : Promise<Response> => {
        const {currentUser} = res.locals;
        const id = Number(currentUser.id)
        const task = {...req.body, userId: id }
        const newTask = await this.tasksServices.create(task);
        return res.status(status.HTTP_201_CREATED).json(newTask)
    }

    public readingTasksList = async ({query}: Request, res: Response): Promise<Response>=>{
        const category = query.category? String(query.category) : undefined;
        const {currentUser} = res.locals;
        const userId = Number(currentUser.id);
        const listTasks = await this.tasksServices.readingList(userId, category);
        return res.status(status.HTTP_200_OK).json(listTasks);   
    }


    public readingTask = async ({params}: Request, res: Response): Promise<Response>=>{
        const {taskOne} = res.locals;
        const taskId =  Number(taskOne.id); 
        const {currentUser} = res.locals;
        const userId = Number(currentUser.id)
        const getTask = await this.tasksServices.readingOne(taskId, userId);

        return res.status(status.HTTP_200_OK).json(getTask);
    }

    public updateTask = async (req: Request, res: Response): Promise<Response>=>{
        const {currentUser} = res.locals;
        const idUser = Number(currentUser.id);
        const taskId = Number(req.params.id);
        const task = req.body;

        const updateTask = await this.tasksServices.update(task, taskId, idUser)
        return res.status(status.HTTP_200_OK).json(updateTask);
    }
    
    public deleteTask = async (req: Request, res: Response): Promise<Response>=>{
        const taskId = Number(req.params.id);
        await this.tasksServices.delete(taskId);
        return res.status(status.HTTP_204_NO_CONTENT).json();
    }
}
