import { Router } from "express";
import * as attendanceController from "../controllers/attendanceController.js";

const attendanceRouter = Router();

attendanceRouter.get("/me", attendanceController.getMyAttendance);

attendanceRouter.post("/checkin", attendanceController.checkIn);

attendanceRouter.patch("/checkout", attendanceController.checkOut);

attendanceRouter.get("/status", attendanceController.checkedIn);

export default attendanceRouter;
