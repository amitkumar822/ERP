import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClassDetailsOnly,
  getAllClasses,
  getClassesByAcademicYearSection,
  updateClass,
} from "../controllers/class.controller.js";
import { createUpdateTimeTable, deleteTimeTablePeriod, editTimeTablePeriod, getAllTimeTable } from "../controllers/classTimeTable.controller.js";

const router = Router();

//^ Router defined for class related operations
router.post("/create", createClass);
router.put("/update/:classId", updateClass);
router.delete("/delete/:classId", deleteClass);
router.get("/get-all-class", getAllClasses);
router.get("/get-class-academic-section/:className/:section/:academicYear", getClassesByAcademicYearSection);

router.get("/get-class-details-only", getAllClassDetailsOnly);


//& Class Time Table Router Methods
router.post("/create-class-timetable", createUpdateTimeTable); 
router.get("/get-class-timetable", getAllTimeTable);
router.put("/edit-timetable-period/:periodId", editTimeTablePeriod);
router.delete("/delete-timetable-period/:periodId", deleteTimeTablePeriod);


export default router;
