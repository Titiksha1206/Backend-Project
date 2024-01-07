import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

// /register jaise hi hit hoga mai yeh method call kr dunga.
userRouter.route("/register").post(registerUser);

// userRouter.route("/login").post(loginUser);

export default userRouter;
