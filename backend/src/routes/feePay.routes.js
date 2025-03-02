import { Router } from "express";
import { getPendingFeeDetail, getStudentFee, payPendingFees, payStudentFees } from "../controllers/studentFee.controller.js";
import { getTeacherFee, payTeacherFees } from "../controllers/fees/teacherFee.controller.js";

const router = Router();

//* Student fees routes
router.post("/pay-student-fee", payStudentFees);
router.get("/get-student-fee", getStudentFee);
router.put("/pay-pending-student-fee/:feeId", payPendingFees);
router.get("/get-pending-fees", getPendingFeeDetail);

//* Teacher fees routes 
router.post("/pay-teacher-fees/:teacherId", payTeacherFees);
router.get("/get-teacher-fees", getTeacherFee);

export default router;
