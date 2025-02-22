import { Router } from "express";
import { deleteAttendance, getAttendanceByClass, markAttendance } from "../controllers/attendance.controller.js";

const router = Router();

// Route definition
router.post("/attendance", markAttendance);
router.get("/get-all-attendance", getAttendanceByClass);
router.delete("/delete", deleteAttendance);

export default router;