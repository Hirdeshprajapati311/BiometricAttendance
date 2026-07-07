import { Router } from "express";
import { adminOnly, protect } from "../middleware/auth.middleware.js";
import {
  getLeaveBalance,
  createLeaveRequest,
  getMyLeaveRequest,
  getLeaves,
  updateLeaveRequest,
  updateStatus,
} from "../controllers/leaveReqController.js";

const leaveRouter = Router();

leaveRouter.get("/", adminOnly, getLeaves);
leaveRouter.get("/balance", getLeaveBalance);
leaveRouter.post("/create", createLeaveRequest);
leaveRouter.get("/me", getMyLeaveRequest);
leaveRouter.patch("/:id", updateLeaveRequest);
leaveRouter.patch("/withdraw/:id", updateStatus);

export default leaveRouter;
