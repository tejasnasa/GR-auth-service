import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import { ServiceResponse } from "../models/serviceResponse";

export const authVerify = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json(ServiceResponse.failed("No token provided"));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(ServiceResponse.failed("Invalid token"));
  }
};
