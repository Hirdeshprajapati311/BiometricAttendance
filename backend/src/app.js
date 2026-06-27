import express from "express";
import cors from "cors";
import config from "./config/config.js";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.route.js";
import { adminOnly, protect } from "./middleware/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users/", protect, adminOnly, adminRouter);

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
