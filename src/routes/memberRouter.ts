import { Router } from "express";
import { viewTasks } from "../controllers/member/viewTasks";
import { beginTask } from "../controllers/member/beginTask";
import { endTask } from "../controllers/member/endTask";

const memberRouter = Router();

memberRouter.get("/view", viewTasks);
memberRouter.post("/begin", beginTask);
memberRouter.post("/end", endTask);

export default memberRouter;
