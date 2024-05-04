import { injectable } from 'tsyringe';
import { prisma } from "../database/prisma";
import { TCategoryBody, TCreateCategory } from "../interfaces/index";

@injectable()
export class CategoriesServices{
    public create = async (payload: TCreateCategory): Promise<TCategoryBody> =>{
        return await prisma.category.create({data:payload});
    };

    public delete = async(categoryId: number) =>{
        return await prisma.category.delete({
            where: {id: categoryId}
        });
    }
}