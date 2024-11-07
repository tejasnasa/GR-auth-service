import { Router } from "express";
import { login } from "../controllers/auth/login";
import { signup } from "../controllers/auth/signup";
import { validateLogin } from "../validators/loginValidate";
import { validateSignup } from "../validators/signupValidate";
import { googleLogin } from "../controllers/auth/googleLogin";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);
authRouter.post("/googlelogin", googleLogin);

export default authRouter;
