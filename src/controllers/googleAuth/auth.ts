import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { prisma } from "../../index";
// import { compare } from "bcrypt";
// import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";
import admin from "./firebase";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const app = express();


declare module "express-serve-static-core" {
  interface Request {
    user?: admin.auth.DecodedIdToken;
  }
}
async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>{
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    res.status(401).send("unauthorized");
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("unauthorized");
    return;
  }
}

app.post("/api/protected", verifyToken, async (req: Request, res: Response):Promise<void> =>{
  if (!req.user) {
    res.status(401).json(ServiceResponse.unauthorized("User is not authenticated"));
    return;
  }
  const {uid, name, email, picture} = req.user;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
    return;
  }
  res.send(user);
});

app.listen(3001, ()=>{
  console.log("Server is running on port 3001");
})