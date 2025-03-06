import { Router } from "express";
import {
  addStudent,
  deleteStudentById,
  getAllStudents,
  getSameClassStudents,
  promoteStudents,
} from "../controllers/student.controller.js";

const router = Router();

// Route defin
router.post("/add", addStudent);
router.get("/get-all-students", getAllStudents);
router.delete("/delete/:studentId", deleteStudentById);
router.post("/promote-students/:newClassId", promoteStudents);
router.post("/get-sameclass-students/:classId", getSameClassStudents);

export default router;
