import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { prisma } from "../index";
import { createToken } from "../utils/jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";
import {
  createFirebaseUser,
  deleteFirebaseUser,
  pollEmailVerification,
} from "./firebaseControllers";

export const signup = async (req: any, res: any, next: any) => {
  const { email, phonenum, password, department, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(401)
        .json(ServiceResponse.exists("Email already exists"));
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

      const token = createToken({ email: newUser.email });
      await deleteFirebaseUser(firebaseUser);

      return res.status(201).json(
        ServiceResponse.create("User created successfully", {
          accessToken: token,
          user: newUser,
        })
      );
    }

    await deleteFirebaseUser(firebaseUser);
    return res
      .status(400)
      .json(ServiceResponse.failed("Verification not completed."));
  } catch (error) {
    console.log(error);
    return res.status(400).json(ServiceResponse.failed("Error creating user"));
  }
};
