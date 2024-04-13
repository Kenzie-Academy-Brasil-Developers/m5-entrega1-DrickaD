import { Request, Response } from "express";
import { tasksServices } from "../services/index";

class TasksControllers{
    public createTask = async (req: Request, res: Response) : Promise<Response> => {
        const task = await tasksServices.create(req.body)
        return res.status(201).json(task)
    }

    public readingTasksList = async ({query}: Request, res: Response): Promise<Response>=>{
        const search = query.search ? String(query.search) : undefined; 
        const listTasks = await tasksServices.readingList(search);
        return res.status(200).json(listTasks);
    
    }

    public readingTask = async (req: Request, res: Response): Promise<Response>=>{
        const taskId = Number(req.params.id);
        const getTask = await tasksServices.readingOne(taskId);
        return res.status(200).json(getTask)
    }

    public updateTask = async (req: Request, res: Response): Promise<Response>=>{
        const taskId = Number(req.params.id);
        const task = req.body;
        const updateTask = await tasksServices.update(task, taskId)
        return res.status(200).json(updateTask);
    }
    
    public deleteTask = async (req: Request, res: Response): Promise<Response>=>{
        const taskId = Number(req.params.id);
        await tasksServices.delete(taskId);
        return res.status(204).json();
    }
}
export const tasksControllers = new TasksControllers();