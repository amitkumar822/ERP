import { Router } from "express";
import {
  deleteAttendance,
  getAttendanceByClassMonthDate,
  markAttendance,
} from "../controllers/attendance.controller.js";

const router = Router();

// Route definition
router.post("/attendance", markAttendance);
router.get("/get-attendance-month-date", getAttendanceByClassMonthDate);
router.delete("/delete", deleteAttendance);

export default router;
