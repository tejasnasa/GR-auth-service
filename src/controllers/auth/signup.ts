import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { prisma } from "../../index";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";
import {
  createFirebaseUser,
  deleteFirebaseUser,
  pollEmailVerification,
} from "./firebaseControllers";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, phonenum, password, department, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res
        .status(401)
        .json(ServiceResponse.unauthorized("Email already exists"));
      return;
    }

    const hashedPassword = await hash(password, 10);

    const firebaseUser = await createFirebaseUser(email, password);
    console.log("Email sent!");

    const verified = await pollEmailVerification(firebaseUser);

    if (verified) {
      const newUser = await prisma.user.create({
        data: {
          email,
          phonenum,
          password: hashedPassword,
          department,
          role,
        },
      });

      const isAdmin =
        newUser.role === 1 || newUser.role === 2 || newUser.role === 3;
      const token = createToken({
        userId: newUser.id,
        isAdmin,
      });
      await deleteFirebaseUser(firebaseUser);

      res.status(201).json(
        ServiceResponse.create("User created successfully", {
          accessToken: token,
          user: newUser,
        })
      );
      return;
    }

    await deleteFirebaseUser(firebaseUser);
    res
      .status(400)
      .json(ServiceResponse.badrequest("Verification not completed."));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
