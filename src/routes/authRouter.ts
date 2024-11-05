import { Router } from "express";
import { login } from "../controllers/auth/login";
import { signup } from "../controllers/auth/signup";
import { validateLogin } from "../validators/loginValidate";
import { validateSignup } from "../validators/signupValidate";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);

export default authRouter;
