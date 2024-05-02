import { Request, Response } from "express"
import { CategoriesServices } from "../services/index";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoriesControllers{

    constructor(@inject("categoriesServices") private categoriesServices: CategoriesServices){};

    public createCategory = async (req: Request, res: Response): Promise<Response>=>{
        const category = await this.categoriesServices.create(req.body)
        return res.status(201).json(category);
    }

    public deleteCategory = async ({params}: Request, res: Response): Promise<Response>=>{
        const categoryId = Number(params.id);
        await this.categoriesServices.delete(categoryId);
        return res.status(204).json();
    }
}
