import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getLeaveBalance,
  createLeaveRequest,
  getMyLeaveRequest,
} from "../controllers/leaveReqController.js";

const leaveRouter = Router();

leaveRouter.get("/balance", getLeaveBalance);
leaveRouter.post("/create", createLeaveRequest);
leaveRouter.get("/me",getMyLeaveRequest);

export default leaveRouter;
