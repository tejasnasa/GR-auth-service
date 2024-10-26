import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { validateLogin } from "../validators/login-validators";
import { validateSignup } from "../validators/signup-validators";
import { signout } from "../controllers/signout";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);
authRouter.post("/signout", signout);

export default authRouter;
