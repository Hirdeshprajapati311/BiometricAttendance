import { Router } from "express";
import { adminOnly } from "../middleware/auth.middleware.js";
import {
  dashboardSummary,
  getComparisonAdminChart,
  getWeeklyAdminChart,
} from "../controllers/dashboardController.js";

const dashboardRouter = Router();

dashboardRouter.get("/summary", dashboardSummary);
dashboardRouter.get("/graphChart", getComparisonAdminChart);
dashboardRouter.get("/barChart", getWeeklyAdminChart);

export default dashboardRouter;
