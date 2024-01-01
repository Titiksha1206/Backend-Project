import { app } from "./app.js";
import connectDB from "./db/index.js";
// require("dotenv").config({ path: "./env" });

// improved version or u can say that to maintain the consistency of the code
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at Port: ${process.env.PORT} `);
    });
  })
  .catch((error) => {
    console.log("mongodb connection failed!! ", error);
  });
