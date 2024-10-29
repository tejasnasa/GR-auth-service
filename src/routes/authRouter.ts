import { Router } from "express";
import { Response, NextFunction } from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { validateLogin } from "../validators/login-validators";
import { validateSignup } from "../validators/signup-validators";
import { authMiddleware } from "../utils/authMiddleware";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/signup", validateSignup, signup);

// protected routes
authRouter.get("/prot", authMiddleware, (req: any, res: Response, next: NextFunction) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default authRouter;
