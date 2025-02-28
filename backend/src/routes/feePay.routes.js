import { Router } from "express";
import { getPendingFeeDetail, getStudentFee, payPendingFees, payStudentFees } from "../controllers/studentFee.controller.js";

const router = Router();

//* Student fee routes
router.post("/pay-student-fee", payStudentFees);
router.get("/get-student-fee", getStudentFee);
router.put("/pay-pending-student-fee/:feeId", payPendingFees);
router.get("/get-pending-fees", getPendingFeeDetail);

export default router;
