import express from "express";
import cors from "cors";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use(morgan("dev"));

app.get("/api/auth", authRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
