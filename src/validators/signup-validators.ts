import { Request, Response, NextFunction } from "express";
import { signupSchema } from "./validationSchemas";
import { z } from "zod";

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
