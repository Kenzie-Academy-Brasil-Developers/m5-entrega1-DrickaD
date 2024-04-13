import { z } from "zod";

export const CategoriesSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(3),
});

export const CreateCategorieSchema = CategoriesSchema.omit({id: true})