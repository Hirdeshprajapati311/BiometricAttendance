import express from "express";
import cors from "cors";
import config from "./config/config.js";
import morgan from "morgan";
import { connectDB } from "./db.js";
import cookieParser from "cookie-parser";
import { adminOnly, protect } from "./middleware/auth.middleware.js";

import {
  authRouter,
  adminRouter,
  leaveRouter,
  attendanceRouter,
} from "./routes/routeExports.js";
import {
  catchUpAutoCheckoutIfMissed,
  startAutoCheckoutJob,
} from "./jobs/autoCheckout.js";

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
app.use("/api/v1/leave-request", protect, leaveRouter);
app.use("/api/v1/attendance", protect, attendanceRouter);

const startServer = async () => {
  await connectDB();
  startAutoCheckoutJob();
  await catchUpAutoCheckoutIfMissed();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
