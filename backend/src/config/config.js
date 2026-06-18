import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

const config = {
  port: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
};

export default config;
