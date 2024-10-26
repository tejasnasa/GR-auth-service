import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { prisma } from "../index";
import { createToken } from "../utils/jwt";
import { ServiceResponse } from "../models/serviceResponse";

export const signup = async (req: any, res: any, next: any) => {
  try {
    const { phonenum, password, department, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { phonenum },
    });

    if (existingUser) {
      return res
        .status(401)
        .json(ServiceResponse.failed("Phone number already exists"));
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        phonenum,
        password: hashedPassword,
        department,
        role,
      },
    });

    const token = createToken({ phonenum: newUser.phonenum });

    return res.status(201).json(
      ServiceResponse.success("User created successfully", {
        accessToken: token,
        user: newUser,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(ServiceResponse.failed("Error creating user"));
  }
};
