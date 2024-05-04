import { z } from "zod";

export const CategoriesSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    userId: z.number().positive()
});

export const CreateCategorieSchema = CategoriesSchema.omit({id: true});
export const GetCategoryList = CategoriesSchema.nullish();