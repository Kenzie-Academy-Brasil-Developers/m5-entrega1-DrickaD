import { Router } from "express";
import { CategoriesControllers } from "../controllers";
import { CreateCategorieSchema } from "../schemas/categoriesSchemas";
import { ValidateRequest, isIdCategoryParams } from "../middlewares/index";
import { CategoriesServices } from "../services";
import { container } from "tsyringe";

export const categoriesRouter = Router();

container.registerSingleton("categoriesServices", CategoriesServices);
const categoriesControllers = container.resolve(CategoriesControllers);

categoriesRouter.post("/",
ValidateRequest.execute({body: CreateCategorieSchema}),
(req, res)=> categoriesControllers.createCategory(req, res));

categoriesRouter.delete("/:id", 
isIdCategoryParams.idExists, 
(req, res)=> categoriesControllers.deleteCategory(req, res));

