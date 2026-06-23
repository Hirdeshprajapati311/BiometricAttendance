import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authController.logout);

export default authRouter;
