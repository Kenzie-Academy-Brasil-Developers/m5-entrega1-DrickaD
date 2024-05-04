import "express-async-errors";
import "reflect-metadata";
import helmet from "helmet";
import cors from "cors";
import express, { json } from "express";
import { handleErrors } from "./error/handleErrors.middlewares";
import { tasksRouter, categoriesRouter, usersRouter } from "./routes/index.routes";

export const app = express();
app.use(cors());

app.use(json());
app.use(helmet());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter)

app.use(handleErrors);