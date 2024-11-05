import { Router } from "express";
import { createTask } from "../controllers/admin/createTask";
import { modifyTask } from "../controllers/admin/modifyTask";
import { deleteTask } from "../controllers/admin/deleteTask";
import { viewTasks } from "../controllers/admin/viewTasks";
import {
  createTaskValidate,
  modifyTaskValidate,
} from "../validators/taskValidate";

const adminRouter = Router();

adminRouter.get("/view", viewTasks);
adminRouter.post("/create", createTaskValidate, createTask);
adminRouter.patch("/modify", modifyTaskValidate, modifyTask);
adminRouter.delete("/delete", deleteTask);

export default adminRouter;
