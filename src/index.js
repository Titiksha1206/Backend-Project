import connectDB from "./db/index.js";
// require("dotenv").config({ path: "./env" });

// improved version or u can say that to maintain the consistency of the code
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

connectDB();
