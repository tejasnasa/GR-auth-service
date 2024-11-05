import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const viewTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        task_progress: true,
      },
    });

    if (tasks.length === 0) {
      res.status(404).json(ServiceResponse.notFound("No tasks found"));
      return;
    }

    res
      .status(200)
      .json(ServiceResponse.success("Tasks retrieved successfully", { tasks }));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
