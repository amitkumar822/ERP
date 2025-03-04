import { Router } from "express";
import { getPendingFeeDetail, getStudentFee, payPendingFees, payStudentFees } from "../controllers/studentFee.controller.js";
import { getTeacherFee, payPendingTeacherFees, payTeacherFees } from "../controllers/fees/teacherFee.controller.js";
import { getStaffFee, payPendingStaffFees, payStaffFees } from "../controllers/fees/staffFee.controller.js";

const router = Router();

//* Student fees routes
router.post("/pay-student-fee", payStudentFees);
router.get("/get-student-fee", getStudentFee);
router.put("/pay-pending-student-fee/:feeId", payPendingFees);
router.get("/get-pending-fees", getPendingFeeDetail);

//* Teacher fees routes 
router.post("/pay-teacher-fees/:teacherId", payTeacherFees);
router.get("/get-teacher-fees", getTeacherFee);
router.put("/pay-pending-teacher-fee/:feeId", payPendingTeacherFees);

//* Staff fees routes 
router.post("/pay-staff-fees/:staffId", payStaffFees);
router.get("/get-staff-fees", getStaffFee);
router.put("/pay-pending-staff-fee/:feeId", payPendingStaffFees);

export default router;
