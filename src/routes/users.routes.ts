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
ValidateRequest.execute({body: BodyCreateUserSchema}),
isUserEmailExisting.emailExists,
(req, res)=> userControllers.register(req, res));

usersRouter.post("/login",
ValidateRequest.execute({body: LoginUserBodyschema}),
isUserEmailNotExisting.emailExists,
(req, res)=> userControllers.login(req, res));

usersRouter.get("/profile",
authToken.isAuthenticated,
authToken.isRecourceOwner,
(req, res)=> userControllers.autoLogin(req, res));

