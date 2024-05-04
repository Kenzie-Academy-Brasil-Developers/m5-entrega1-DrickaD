import { z } from "zod";
import { CreateTaksSchema, TasksSchema, UpdateTaskSchema, BodyGetTasksSchema, ReturnTaskSchema } from "../schemas/index";

export type TTaskBody = z.infer<typeof TasksSchema>;
export type TReturnTaskBody = z.infer<typeof ReturnTaskSchema>;
export type TCreateTask = z.infer<typeof CreateTaksSchema>;
export type TUpdateTask = z.infer<typeof UpdateTaskSchema>;
export type TGetTasks = z.infer<typeof BodyGetTasksSchema>;