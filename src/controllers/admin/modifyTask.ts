import { NextFunction, Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

export const modifyTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;
  const {
    title,
    description,
    direct_assign,
    department_assign,
    global_assign,
    deadline,
  } = req.body;

  try {
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      res.status(404).json(ServiceResponse.notFound("Task doesn't exist"));
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title ?? existingTask.title,
        description: description ?? existingTask.description,
        direct_assign: direct_assign ?? existingTask.direct_assign,
        department_assign: department_assign ?? existingTask.department_assign,
        global_assign: global_assign ?? existingTask.global_assign,
        deadline: deadline ?? existingTask.deadline,
      },
    });

    res.status(200).json(
      ServiceResponse.success("Task modified successfully", {
        task: updatedTask,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
