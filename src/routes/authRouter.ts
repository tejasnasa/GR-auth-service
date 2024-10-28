import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { validateLogin } from "../validators/login-validators";
import { validateSignup } from "../validators/signup-validators";
import { verifyToken } from "../utils/jwt";
import { authVerify } from "../utils/authMiddleware";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);

// protected routes
authRouter.get("/prot", authVerify, (req: any, res: any) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default authRouter;
