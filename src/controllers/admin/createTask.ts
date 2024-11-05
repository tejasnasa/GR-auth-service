import { NextFunction, Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

export const createTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.user.userId;
  const {
    title,
    description,
    direct_assign,
    department_assign,
    global_assign,
    deadline,
  } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        created_by: userId,
        direct_assign,
        department_assign,
        global_assign,
        deadline,
      },
    });

    res.status(201).json(
      ServiceResponse.create("Task created successfully", {
        task: newTask,
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
