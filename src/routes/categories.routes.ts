import { Router } from "express";
import { CategoriesControllers } from "../controllers";
import { CreateCategorieSchema} from "../schemas/categoriesSchemas";
import { ValidateRequest, authToken, authUserCategory, isIdCategoryParams } from "../middlewares/index";
import { CategoriesServices } from "../services";
import { container } from "tsyringe";

export const categoriesRouter = Router();

container.registerSingleton("categoriesServices", CategoriesServices);
const categoriesControllers = container.resolve(CategoriesControllers);

categoriesRouter.post("/",
authToken.isAuthenticated,
ValidateRequest.execute({body: CreateCategorieSchema}),
authToken.idBodyOwner,
(req, res)=> categoriesControllers.createCategory(req, res));

categoriesRouter.delete("/:id", 
authToken.isAuthenticated,
authToken.userOwnerCategory,
isIdCategoryParams.idExists,
authUserCategory.idCategoryUser,
(req, res)=> categoriesControllers.deleteCategory(req, res));

