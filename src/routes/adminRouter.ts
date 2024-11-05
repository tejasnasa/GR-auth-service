import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/create");
adminRouter.patch("/modify");
adminRouter.delete("/delete");
