
import { z } from "zod";
import { CategoriesSchema, CreateCategorieSchema } from "../schemas/index";

export type TCategoryBody = z.infer<typeof CategoriesSchema>;
export type TCreateCategory = z.infer<typeof CreateCategorieSchema>;