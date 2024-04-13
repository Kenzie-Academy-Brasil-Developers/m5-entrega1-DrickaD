import { z } from "zod";
import { CategoriesSchema } from "./categoriesSchemas";

export const TasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(3),
    content: z.string().min(3),
    finished: z.boolean(),
    categoryId: z.number().nullish(),
});

export const CreateTaksSchema = TasksSchema.omit({id: true, finished: true});

export const UpdateTaskSchema = TasksSchema.omit({id: true, finished: true}).partial();

export const BodyGetTasksSchema = TasksSchema.omit({categoryId: true}).extend({category: CategoriesSchema});
