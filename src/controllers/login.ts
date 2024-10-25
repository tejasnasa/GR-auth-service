import { Request, Response, NextFunction } from "express";
import { prisma } from "../index";
import { compare } from "bcrypt";
import { createToken } from "../utils/jwt";

export const login = async (req: any, res: any, next: any) => {
  const { phonenum, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        phonenum: phonenum,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Phone number doesn't exist" });
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken({ id: user.id, phonenum: user.phonenum });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Sign-in successful",
      token,
      user: {
        phonenum: user.phonenum,
        department: user.department,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
