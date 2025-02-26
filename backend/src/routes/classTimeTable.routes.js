import { Router } from "express";
import { createUpdateTimeTable } from "../controllers/classTimeTable.controller";

const router = Router();

router.post("/create-time-table", createUpdateTimeTable);

export default router;
