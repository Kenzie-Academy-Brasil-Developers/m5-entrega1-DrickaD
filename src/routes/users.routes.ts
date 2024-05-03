import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/users.services";
import { UserControllers } from "../controllers/users.controllers";
import { BodyCreateUserSchema, LoginUserBodyschema } from "../schemas";
import { ValidateRequest, isUserEmailNotExisting } from "../middlewares";
import { authToken, isUserEmailExisting } from "../middlewares/index";

export const usersRouter = Router();

container.registerSingleton("userServices", UserServices);
const userControllers = container.resolve(UserControllers);

usersRouter.post("/",
isUserEmailExisting.emailExists,
ValidateRequest.execute({body: BodyCreateUserSchema}),
(req, res)=> userControllers.register(req, res));

usersRouter.post("/login",
isUserEmailNotExisting.emailExists,
ValidateRequest.execute({body: LoginUserBodyschema}),
(req, res)=> userControllers.login(req, res));

usersRouter.get("/profile/",
authToken.isAuthenticated,
(req, res)=> userControllers.autoLogin(req, res));

