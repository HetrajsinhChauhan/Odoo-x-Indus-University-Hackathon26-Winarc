import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

const corsOrigin =
  process.env.CORS_ORIGIN ||
  process.env.CLIENT_ORIGIN ||
  "http://localhost:5173";

app.use(cors({ origin: corsOrigin, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Gym SaaS API running 🚀");
});

import AdminRouter from "./Admin/admin.routes.js";
app.use("/api/v1/admin", AdminRouter);

export { app };