import mongoose from "mongoose";
import config from "./config/config.js";

export const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(config.MONGODB_URI);
  console.log("Connected to MongoDB");
};
