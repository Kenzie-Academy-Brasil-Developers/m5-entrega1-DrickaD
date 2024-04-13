import { Request, Response } from "express"
import { categoryServices } from "../services/index";

class CategoriesControllers{
    public createCategory = async (req: Request, res: Response): Promise<Response>=>{
        const category = await categoryServices.create(req.body)
        return res.status(201).json(category);
    }

    public deleteCategory = async ({params}: Request, res: Response): Promise<Response>=>{
        const categoryId = Number(params.id);
        await categoryServices.delete(categoryId);
        return res.status(204).json();
    }
}
export const categoriesControllers = new CategoriesControllers();