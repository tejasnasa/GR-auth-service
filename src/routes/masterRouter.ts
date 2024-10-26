import { Router } from "express";
import authRouter from "./authRouter";

const masterRouter = Router();

masterRouter.use("/auth", authRouter);

export default masterRouter;
