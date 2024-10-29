import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import { compare } from "bcrypt";
import { createToken } from "../utils/jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json(ServiceResponse.unauthorized("Invalid credentials"));
      return;
    }

    const token = createToken({ email: user.email });

    res.status(201).json(
      ServiceResponse.create("Sign-in successful", {
        accessToken: token,
        user: {
          phonenum: user.phonenum,
          email: user.email,
          department: user.department,
          role: user.role,
        },
      })
    );
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
