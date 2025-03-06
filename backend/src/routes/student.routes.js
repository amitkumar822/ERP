import { Router } from "express";
import {
  addStudent,
  deleteStudentById,
  getAllStudents,
  promoteStudents,
} from "../controllers/student.controller.js";

const router = Router();

// Route defin
router.post("/add", addStudent);
router.get("/get-all-students", getAllStudents);
router.delete("/delete/:studentId", deleteStudentById);
router.post("/promote-students/:classId", promoteStudents);

export default router;
