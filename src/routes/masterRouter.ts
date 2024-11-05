import { NextFunction, Response, Router } from "express";
import authRouter from "./authRouter";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import { authCheck } from "../middlewares/authCheck";
import adminRouter from "./adminRouter";
import memberRouter from "./memberRouter";
import { adminCheck } from "../middlewares/adminCheck";
import { userIdCheck } from "../middlewares/userIdCheck";

const swaggerDocument = JSON.parse(
  fs.readFileSync("./swagger/swagger.json", "utf8")
);

const masterRouter = Router();

masterRouter.use("/auth", authRouter);
masterRouter.use("/admin", adminCheck, adminRouter);
masterRouter.use("/member", userIdCheck, memberRouter);
masterRouter.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument)
);

//protected routes
masterRouter.get(
  "/prot",
  authCheck,
  (req: any, res: Response, next: NextFunction) => {
    res.json({ message: "This is a protected route", user: req.user });
  }
);

export default masterRouter;
