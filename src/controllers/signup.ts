import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { prisma } from "../index";
import { createToken } from "../utils/jwt";

export const signup = async (req: any, res: any, next: any) => {
  try {
    const { phonenum, password, department, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { phonenum },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
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

    const token = createToken({ id: newUser.id, phonenum: newUser.phonenum });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating user" });
  }
};
