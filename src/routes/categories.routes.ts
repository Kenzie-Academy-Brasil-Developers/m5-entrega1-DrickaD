import { Router } from "express";
import { categoriesControllers } from "../controllers";

import { CreateCategorieSchema } from "../schemas/categoriesSchemas";
import { ValidateRequest, isIdCategoryParams } from "../middlewares/index";

export const categoriesRouter = Router();

categoriesRouter.post("/",
ValidateRequest.execute({body: CreateCategorieSchema}),
categoriesControllers.createCategory);

categoriesRouter.delete("/:id", 
isIdCategoryParams.idExists, 
categoriesControllers.deleteCategory);

