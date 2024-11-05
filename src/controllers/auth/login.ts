import { Request, Response, NextFunction } from "express";
import { prisma } from "../../index";
import { compare } from "bcrypt";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";

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

    const isAdmin = user.role === 1 || user.role === 2 || user.role === 3;
    const token = createToken({
      userId: user.id,
      isAdmin,
      department: user.department,
    });

    res.status(200).json(
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
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
