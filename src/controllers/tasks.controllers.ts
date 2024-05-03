import { category } from './../tests/mocks/category.mocks';
import { Request, Response, query } from "express";
import { TasksServices} from "../services/index";
import { inject, injectable } from "tsyringe";
import { BodyGetTasksSchema } from '../schemas';

@injectable()
export class TasksControllers{
    constructor(@inject("tasksServices") private tasksServices: TasksServices){};

    public createTask = async (req: Request, res: Response) : Promise<Response> => {
        const task = await this.tasksServices.create(req.body)
        return res.status(201).json(task)
    }

    public readingTasksList = async ({query}: Request, res: Response): Promise<Response>=>{
        const {currentUser} = res.locals; 
        const id = Number(currentUser.id);
        const category = query.category? String(query.category) : undefined;

        const listTasks = await this.tasksServices.readingList(id, category);
        console.log(listTasks);
        return res.status(200).json(listTasks);   
    }


    public readingTask = async ({params}: Request, res: Response): Promise<Response>=>{
        const taskId =  Number(params.id); 
        const getTask = await this.tasksServices.readingOne(taskId);
        return res.status(200).json(getTask);
    }

    public updateTask = async (req: Request, res: Response): Promise<Response>=>{
        const {currentUser} = res.locals;
        const idUser = Number(currentUser.id);
        const taskId = Number(req.params.id);
        const task = req.body;

        const updateTask = await this.tasksServices.update(task, taskId, idUser)
        return res.status(200).json(updateTask);
    }
    
    public deleteTask = async (req: Request, res: Response): Promise<Response>=>{
        const taskId = Number(req.params.id);
        await this.tasksServices.delete(taskId);
        return res.status(204).json();
    }
}
