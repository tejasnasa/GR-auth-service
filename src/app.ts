import express from "express";
import { config } from "dotenv";
import { customLogger } from "./utils/logger";
import masterRouter from "./routes/masterRouter";

config();

const app = express();

app.use(express.json());

app.use(customLogger);

app.use("/api/v1", masterRouter);

export default app;
