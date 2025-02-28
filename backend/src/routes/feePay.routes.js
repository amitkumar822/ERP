import { Router } from "express";
import { getStudentFee, payStudentFees } from "../controllers/studentFee.controller.js";

const router = Router();

//* Student fee routes
router.post("/pay-student-fee", payStudentFees);
router.get("/get-student-fee", getStudentFee);

export default router;
