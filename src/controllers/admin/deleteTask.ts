import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;
  try {
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      res.status(404).json(ServiceResponse.notFound("Task doesn't exist"));
      return;
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(200).json(ServiceResponse.success("Task deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
