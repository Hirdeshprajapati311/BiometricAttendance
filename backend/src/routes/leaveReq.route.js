import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getLeaveBalance } from "../controllers/leaveReqController.js";

const leaveRouter = Router();

leaveRouter.get("/balance", getLeaveBalance);

export default leaveRouter;
