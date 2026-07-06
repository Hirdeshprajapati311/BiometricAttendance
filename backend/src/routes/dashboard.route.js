import { Router } from "express";
import { adminOnly } from "../middleware/auth.middleware.js";
import { dashboardSummary } from "../controllers/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get("/summary", adminOnly, dashboardSummary);

export default dashboardRouter;
