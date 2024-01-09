import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

// /register jaise hi hit hoga mai yeh method call kr dunga.

userRouter.route("/register").post(
  // middleware for file, .fields can handle multiple files.

  upload.fields([
    // ab yaha pr mai 2 file accept kr rha hu.(avatar and coverimage)

    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// userRouter.route("/login").post(loginUser);

export default userRouter;
