import { Router } from "express";
import {
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  joiningTeacher,
} from "../controllers/teacher.controller.js";

const router = Router();

// Route definition
router.post("/joining-and-update", joiningTeacher);
router.get("/get-all-teachers", getAllTeachers);
router.delete("/remove-teacher/:teacherId", deleteTeacher);

router.get("/get-teacher-byid/:teacherId", getTeacherById);

export default router;
