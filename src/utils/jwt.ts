import jwt from "jsonwebtoken";

const JWT_token = `${process.env.JWT_SECRET}`;
export const createToken = (payload: object): string => {
  return jwt.sign(payload, JWT_token, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_token);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
