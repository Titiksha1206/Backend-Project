import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import cors from "cors";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// import routes.
import userRouter from "./routes/user.routes.js";

// routes declaration.
app.use("/api/v1/users", userRouter); //http://localhost:8000/api/v1/users/register
// /users pr koi bhi aayega toh maii handel nhi krta hu, maii userRouter ko pass on kr deta hu.

export { app };
