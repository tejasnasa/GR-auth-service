import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";

export const adminCheck = (req: any, res: any, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json(ServiceResponse.unauthorized("No token provided"));
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    if (!decoded.isAdmin) {
      return res.status(401).json({ message: "Access denied. Not an admin." });
    }
    next();
  } catch (error) {
    res.status(401).json(ServiceResponse.unauthorized("Invalid token"));
    return;
  }
};
