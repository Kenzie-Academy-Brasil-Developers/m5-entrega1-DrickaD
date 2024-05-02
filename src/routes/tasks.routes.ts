import { ValidateRequest, isTaskIdValid, isCategoryIdBody, isCategoryNameQuery} from './../middlewares/index';
import { Router } from "express";
import { TasksControllers } from "../controllers/index";
import { CreateTaksSchema, UpdateTaskSchema } from "../schemas/index";
import { TasksServices } from '../services';
import { container } from 'tsyringe';

export const tasksRouter = Router();

container.registerSingleton("tasksServices", TasksServices);
const tasksControllers = container.resolve(TasksControllers);

tasksRouter.post("/",
ValidateRequest.execute({body: CreateTaksSchema}),
isCategoryIdBody.idExists, 
(req, res)=> tasksControllers.createTask(req, res));

tasksRouter.get("/",
isCategoryNameQuery.nameExists, 
(req, res)=> tasksControllers.readingTasksList(req, res));

tasksRouter.get("/:id",
isTaskIdValid.idExists, 
(req, res)=> tasksControllers.readingTask(req, res));

tasksRouter.patch("/:id",
isTaskIdValid.idExists, 
ValidateRequest.execute({body: UpdateTaskSchema}),
(req, res)=> tasksControllers.updateTask(req, res));

tasksRouter.delete("/:id",
isTaskIdValid.idExists,
(req, res)=> tasksControllers.deleteTask(req, res));
