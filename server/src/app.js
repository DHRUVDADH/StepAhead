import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
console.log("CORS Origin:", process.env.CORS_ORIGIN);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

export { app };
