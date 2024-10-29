import { NextFunction, Response, Router } from "express";
import authRouter from "./authRouter";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import { authMiddleware } from "../utils/authMiddleware";

const swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger/swagger.json", "utf8")
);

const masterRouter = Router();

masterRouter.use("/auth", authRouter);
masterRouter.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

//protected routes
masterRouter.get(
  "/prot",
  authMiddleware,
  (req: any, res: Response, next: NextFunction) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

export default masterRouter;
