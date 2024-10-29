import { Response, NextFunction } from "express";
import { verifyToken } from "./jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json(ServiceResponse.failed("No token provided"));
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(ServiceResponse.failed("Invalid token"));
    return;
  }
};
