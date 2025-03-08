import { Router } from "express";
import {
  addStudent,
  deleteStudentById,
  getAllStudents,
  getSameClassStudents,
  promoteStudents,
} from "../controllers/student.controller.js";
import { createStudentResult, deleteStudentResult, getAllStudentResult, getResultsByClass, getStudentResult, updateStudentResult } from "../controllers/studentResult.controller.js";

const router = Router();

// Route define
router.post("/add", addStudent);
router.get("/get-all-students", getAllStudents);
router.delete("/delete/:studentId", deleteStudentById);
router.post("/promote-students/:newClassId", promoteStudents);
router.post("/get-sameclass-students/:classId", getSameClassStudents);

// Student results route define.
router.post("/create-student-results/:classId", createStudentResult);
router.get("/get-all-students-results", getAllStudentResult);
router.get("/get-student-results-class-wise/:classId", getResultsByClass);
router.get("/get-single-student-result/:studentId", getStudentResult);
router.put("/update-student-result/:studentId", updateStudentResult);
router.delete("/delete-student-result/:studentId", deleteStudentResult);

export default router;
