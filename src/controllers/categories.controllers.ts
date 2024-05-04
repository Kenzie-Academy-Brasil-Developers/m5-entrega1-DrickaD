import { category } from './../tests/mocks/category.mocks';
import { Request, Response } from "express"
import { CategoriesServices } from "../services/index";
import { inject, injectable } from "tsyringe";
import { status } from '../utils/HTTP.statusCode';

@injectable()
export class CategoriesControllers{

    constructor(@inject("categoriesServices") private categoriesServices: CategoriesServices){};

    public createCategory = async (req: Request, res: Response): Promise<Response>=>{
        const category = await this.categoriesServices.create(req.body)
        return res.status(status.HTTP_201_CREATED).json(category);
    }

    public deleteCategory = async ({params}: Request, res: Response): Promise<Response>=>{
        const categoryId = Number(params.id)
        await this.categoriesServices.delete(categoryId);
        return res.status(status.HTTP_204_NO_CONTENT).json();
    }
}
