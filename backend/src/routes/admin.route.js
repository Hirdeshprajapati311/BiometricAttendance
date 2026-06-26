import { Router } from "express";
import { adminOnly, protect } from "../middleware/auth.middleware.js";
import { createUser, getAll } from "../controllers/adminControllor.js";

const adminRouter = Router();
adminRouter.post("/create", protect, adminOnly, createUser);
adminRouter.get("/all", protect, adminOnly, getAll);

export default adminRouter;
