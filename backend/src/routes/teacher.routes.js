import { Router } from "express"
import { addTimeTablesTeacher, deleteTimeTablePeriod, getAllTeachers, getTeacherById, joiningTeacher, updateTimeTablePeriod } from "../controllers/teacher.controller.js";

const router = Router();

// Route definition
router.post("/joining-class", joiningTeacher);
router.get("/get-all-teachers", getAllTeachers);
router.get("/get-teacher-byid/:teacherId", getTeacherById);
router.post("/add-time-table/:teacherId", addTimeTablesTeacher);
router.delete("/delete-timetable/:teacherId", deleteTimeTablePeriod);
router.put("/update-timetable/:teacherId", updateTimeTablePeriod);

export default router