import {
    ValidateRequest,
    isTaskIdValid,
    isCategoryIdBody,
    isCategoryNameQuery,
    authToken,
    authUserCategory,
    isTasksOwner} from './../middlewares/index';

import { Router } from "express";
import { TasksControllers } from "../controllers/index";
import { CreateTaksSchema, UpdateTaskSchema } from "../schemas/index";
import { TasksServices } from '../services';
import { container } from 'tsyringe';

export const tasksRouter = Router();

container.registerSingleton("tasksServices", TasksServices);
const tasksControllers = container.resolve(TasksControllers);

tasksRouter.post("/",
authToken.isAuthenticated,
ValidateRequest.execute({body: CreateTaksSchema}),
authUserCategory.idCategoryUser,
authToken.idBodyOwner,
isCategoryIdBody.idExists, 
(req, res)=> tasksControllers.createTask(req, res));

tasksRouter.get("/",
authToken.isAuthenticated,
isTasksOwner.listsTaksOwner,
isCategoryNameQuery.nameExists,
(req, res)=> tasksControllers.readingTasksList(req, res));

tasksRouter.get("/:id",
authToken.isAuthenticated,
isTaskIdValid.taskExists, 
authToken.userOwner,
(req, res)=> tasksControllers.readingTask(req, res));

tasksRouter.patch("/:id",
authToken.isAuthenticated,
isTaskIdValid.taskExists,
authToken.userOwner,
ValidateRequest.execute({body: UpdateTaskSchema}),
(req, res)=> tasksControllers.updateTask(req, res));

tasksRouter.delete("/:id",
authToken.isAuthenticated,
authToken.userOwner,
isTaskIdValid.taskExists,
(req, res)=> tasksControllers.deleteTask(req, res));
