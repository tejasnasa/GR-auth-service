import { Request, Response } from "express";

export const signout = (req: any, res: any) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Signed out successfully" });
};
