import { prisma } from "../database/prisma";
import { TCreateTask, TGetTasks, TTaskBody, TUpdateTask } from "../interfaces/index";
import { BodyGetTasksSchema, TasksSchema } from '../schemas/tasksSchema';

class TasksServices{
    public create = async (payload: TCreateTask): Promise<TTaskBody> =>{
        const task = await prisma.task.create({data: payload});
        const newTask = TasksSchema.parse(task); 
        return newTask;
    };

    public readingList = async(search?: string): Promise<Array<TGetTasks>> =>{
        const listTasks = await prisma.task.findMany({
            where: {category: {name: {contains: search, mode:"insensitive"}}}, 
            orderBy: { id: "asc" }, 
            include: {category: true}
        });
           const tasksList = BodyGetTasksSchema.array().parse(listTasks);
           return tasksList;
    };

    public readingOne = async(taskId: number ): Promise<TGetTasks> =>{
        const currentTask = await prisma.task.findFirst({where:{id: taskId}, include: {category: true}});
        const readingTask = BodyGetTasksSchema.parse(currentTask); 
        return readingTask;
    };

    public update = async(task: TUpdateTask, taskId: number): Promise<TTaskBody>=>{
        const currentTask = await prisma.task.update({where:{id: taskId}, data: task});
        const taskUpdate = TasksSchema.parse(currentTask);
        return taskUpdate;
    };

    public delete = async(taskId: number) =>{
       return await prisma.task.delete({where: {id: taskId}});
    };
}
export const tasksServices = new TasksServices();