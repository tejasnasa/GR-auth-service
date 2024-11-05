import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const viewTasks = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { department: true, role: true },
    });

    if (!user) {
      res.status(404).json(ServiceResponse.failed("User not found"));
      return;
    }

    const directTasks = await prisma.task.findMany({
      where: {
        direct_assign: { has: userId },
      },
    });

    const departmentTasks = await prisma.task.findMany({
      where: {
        department_assign: { has: user.department },
      },
    });

    const globalTasks = await prisma.task.findMany({
      where: {
        global_assign: true,
      },
    });

    const allTasks = [...directTasks, ...departmentTasks, ...globalTasks];

    res.status(200).json(
      ServiceResponse.success("Tasks retrieved successfully", {
        tasks: allTasks,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
