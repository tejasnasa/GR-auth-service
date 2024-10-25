import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/router";

config();
export const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(express.json());

//remove later
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
