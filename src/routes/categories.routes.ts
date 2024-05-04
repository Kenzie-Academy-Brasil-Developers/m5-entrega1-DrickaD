import { Router } from "express";
import { CreateCategorieSchema} from "../schemas/categoriesSchemas";
import {
    ValidateRequest,
    authToken,
    isIdCategoryParams,
    isUserCategoryIdOwner,
    userIdBodyOwnerToken } from "../middlewares/index";

import { CategoriesControllers } from "../controllers";
import { CategoriesServices } from "../services";
import { container } from "tsyringe";

export const categoriesRouter = Router();

container.registerSingleton("categoriesServices", CategoriesServices);
const categoriesControllers = container.resolve(CategoriesControllers);

categoriesRouter.post("/",
authToken.isAuthenticated,
ValidateRequest.execute({body: CreateCategorieSchema}),
userIdBodyOwnerToken.execute,
(req, res)=> categoriesControllers.createCategory(req, res));

categoriesRouter.delete("/:id", 
authToken.isAuthenticated,
isIdCategoryParams.idExists,
isUserCategoryIdOwner.execute,
(req, res)=> categoriesControllers.deleteCategory(req, res));

