import express from "express";
import cors from "cors";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/api", authRouter);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
