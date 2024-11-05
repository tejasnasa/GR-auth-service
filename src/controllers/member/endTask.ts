import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const endTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { taskId } = req.body;
  const userId = req.userId;

  try {
    const taskProgress = await prisma.taskProgress.findFirst({
      where: {
        task_id: taskId,
        member_id: userId,
        status: "in_progress",
      },
    });

    if (!taskProgress) {
      res
        .status(404)
        .json(
          ServiceResponse.notFound("Task progress not found or not in progress")
        );
      return;
    }

    const updatedTaskProgress = await prisma.taskProgress.update({
      where: {
        id: taskProgress.id,
      },
      data: {
        status: "completed",
        end_date: new Date(),
      },
    });

    res.status(200).json(
      ServiceResponse.success("Task ended successfully", {
        taskProgress: updatedTaskProgress,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};
