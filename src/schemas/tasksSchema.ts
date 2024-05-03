import { z } from "zod";
import { GetCategoryList } from "./index";

export const TasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(3),
    content: z.string(),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
    userId:  z.number().positive()
});

export const CreateTaksSchema = TasksSchema.omit({id: true, finished: true});

export const UpdateTaskSchema = TasksSchema.omit({id: true, userId: true}).partial();

export const BodyGetTasksSchema = TasksSchema.omit({categoryId: true}).extend({category: GetCategoryList});

