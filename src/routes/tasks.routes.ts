import {
    ValidateRequest,
    isTaskIdValid,
    isCategoryNameQuery,
    authToken,
    userOwnerTask,
    isCategoryIdBodyExists,
    isOwnerTaskList,
    userOwnerCategoryBody} from './../middlewares/index';

import { Router } from "express";
import { TasksControllers } from "../controllers/index";
import { CreateTaksSchemaBody, UpdateTaskSchema } from "../schemas/index";
import { TasksServices } from '../services';
import { container } from 'tsyringe';

export const tasksRouter = Router();

container.registerSingleton("tasksServices", TasksServices);
const tasksControllers = container.resolve(TasksControllers);

tasksRouter.post("/",
authToken.isAuthenticated,
ValidateRequest.execute({body: CreateTaksSchemaBody}),
isCategoryIdBodyExists.execute,
userOwnerCategoryBody.userOwner,
(req, res)=> tasksControllers.createTask(req, res));

tasksRouter.get("/",
authToken.isAuthenticated,
isCategoryNameQuery.execute,
isOwnerTaskList.execute,
(req, res)=> tasksControllers.readingTasksList(req, res));

tasksRouter.get("/:id",
authToken.isAuthenticated,
isTaskIdValid.execute, 
userOwnerTask.execute,
(req, res)=> tasksControllers.readingTask(req, res));

tasksRouter.patch("/:id",
authToken.isAuthenticated, 
isTaskIdValid.execute,
userOwnerTask.execute, 
isCategoryIdBodyExists.execute,
userOwnerCategoryBody.userOwner,
ValidateRequest.execute({body: UpdateTaskSchema}),
(req, res)=> tasksControllers.updateTask(req, res));

tasksRouter.delete("/:id",
authToken.isAuthenticated,
isTaskIdValid.execute,
userOwnerTask.execute,
(req, res)=> tasksControllers.deleteTask(req, res));
