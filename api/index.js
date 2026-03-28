import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ Error:", err);
  });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("server is running at port 3000!!!!!!!!!!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
