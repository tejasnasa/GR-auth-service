import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const beginTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { taskId } = req.body;
  const { userId, department } = req.user;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      res.status(404).json(ServiceResponse.failed("Task not found"));
      return;
    }

    const isUserAssigned = task.direct_assign?.includes(userId);
    const isUserInDepartment = task.department_assign?.includes(department);
    const isGlobalTask = task.global_assign;

    if (!isUserAssigned && !isUserInDepartment && !isGlobalTask) {
      res
        .status(401)
        .json(
          ServiceResponse.unauthorized(
            "You are not authorized to start this task"
          )
        );
      return;
    }

    const currentDate = new Date();
    if (task.deadline && currentDate > task.deadline) {
      res
        .status(401)
        .json(
          ServiceResponse.unauthorized("Cannot start task, deadline has passed")
        );
      return;
    }

    const taskProgressEntry = await prisma.taskProgress.create({
      data: {
        member_id: userId,
        task_id: taskId,
      },
    });

    res.status(201).json(
      ServiceResponse.create("Task started successfully", {
        taskProgress: taskProgressEntry,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};
