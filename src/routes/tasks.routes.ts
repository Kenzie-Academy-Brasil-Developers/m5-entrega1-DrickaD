import { ValidateRequest, isTaskIdValid, isCategoryIdBody, isCategoryNameQuery} from './../middlewares/index';
import { Router } from "express";
import { tasksControllers } from "../controllers/index";
import { CreateTaksSchema, UpdateTaskSchema } from "../schemas/index";

export const tasksRouter = Router();

tasksRouter.post("/",
ValidateRequest.execute({body: CreateTaksSchema}),
isCategoryIdBody.idExists,
tasksControllers.createTask);

tasksRouter.get("/",
isCategoryNameQuery.nameExists,
tasksControllers.readingTasksList);

tasksRouter.get("/:id",
isTaskIdValid.idExists,
tasksControllers.readingTask);

tasksRouter.patch("/:id",
isTaskIdValid.idExists, 
ValidateRequest.execute({body: UpdateTaskSchema}),
tasksControllers.updateTask);

tasksRouter.delete("/:id",
isTaskIdValid.idExists,
tasksControllers.deleteTask);
