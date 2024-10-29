import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import { compare } from "bcrypt";
import { createToken } from "../utils/jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";

export const login = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json(ServiceResponse.failed("User doesn't exist"));
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(ServiceResponse.failed("Invalid credentials"));
    }

    const token = createToken({ email: user.email });

    return res.status(200).json(
      ServiceResponse.success("Sign-in successful", {
        accessToken: token,
        user: {
          phonenum: user.phonenum,
          email: user.email,
          department: user.department,
          role: user.role,
        },
      })
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(ServiceResponse.failed("Internal server error"));
  }
};
