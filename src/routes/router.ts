import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { validateLogin } from "../validators/login-validators";
import { validateSignup } from "../validators/signup-validators";
import { signout } from "../controllers/signout";

const appRouter = Router();

appRouter.post("/login", validateLogin, login);
appRouter.post("/signup", validateSignup, signup);
appRouter.post("/signout", signout);

export default appRouter;
