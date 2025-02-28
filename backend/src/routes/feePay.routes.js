import { Router } from "express";
import { payStudentFees } from "../controllers/studentFee.controller.js";

const router = Router();

router.post("/pay-student-fee", payStudentFees);

export default router;
