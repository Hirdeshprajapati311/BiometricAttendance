import { Router } from "express";
import { adminOnly, protect } from "../middleware/auth.middleware.js";
import {
  createUser,
  getAll,
  updateUser,
} from "../controllers/adminControllor.js";

const adminRouter = Router();
adminRouter.post("/create", createUser);
adminRouter.get("/all", getAll);
adminRouter.patch("/:id", updateUser);

export default adminRouter;
