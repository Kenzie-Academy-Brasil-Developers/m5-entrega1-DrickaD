import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/users.services";
import { UserControllers } from "../controllers/users.controllers";
import { BodyCreateUserSchema, LoginUserBodyschema } from "../schemas";
import {
    ValidateRequest,
    isUserEmailExisting,
    userIdParamsOwnerToken,
    authToken } from "../middlewares";


export const usersRouter = Router();

container.registerSingleton("userServices", UserServices);
const userControllers = container.resolve(UserControllers);

usersRouter.post("/",
ValidateRequest.execute({body: BodyCreateUserSchema}),
isUserEmailExisting.registeredEmail,
(req, res)=> userControllers.register(req, res));

usersRouter.post("/login",
isUserEmailExisting.userNotFound,
ValidateRequest.execute({body: LoginUserBodyschema}),
(req, res)=> userControllers.login(req, res));

usersRouter.get("/profile/",
authToken.isAuthenticated,
(req, res)=> userControllers.autoLogin(req, res));

