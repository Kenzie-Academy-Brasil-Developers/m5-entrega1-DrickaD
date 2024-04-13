import "express-async-errors";
import helmet from "helmet";
import express, { json } from "express";
import { tasksRouter } from "./routes/tasks.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { handleErrors } from "./error/handleErrors.middlewares";

export const app = express();

app.use(json());
app.use(helmet());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);

app.use(handleErrors);