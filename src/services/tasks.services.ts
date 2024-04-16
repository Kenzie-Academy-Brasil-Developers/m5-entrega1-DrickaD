import { category } from './../tests/mocks/category.mocks';
import { getTaskList } from './../tests/mocks/tasks.mocks';
import { prisma } from "../database/prisma";
import { TCreateTask, TGetTasks, TTaskBody, TUpdateTask } from "../interfaces/index";
import { BodyGetTasksSchema, TasksSchema } from '../schemas/tasksSchema';

class TasksServices{
    public create = async (payload: TCreateTask): Promise<TTaskBody> =>{
        const task = await prisma.task.create({data: payload});
        const newTask = TasksSchema.parse(task); 
        return newTask;
    };

    public readingList = async(category?: string): Promise<Array<TGetTasks>> =>{

        if(!category){
            const getTaskList = await prisma.task.findMany({include: {category: true}});
            const tasksList = BodyGetTasksSchema.array().parse(getTaskList);
            return tasksList;
        }

        const getTaskList = await prisma.task.findMany({
            where: {category: {name: {equals: category, mode:"insensitive"}}},  
            include: {category: true}
        });
        const tasksList = BodyGetTasksSchema.array().parse(getTaskList);
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