import { Router } from "express"
import { deleteStaff, getAllStaff, joiningStaff } from "../controllers/staff.controller.js"

const router = Router()

// define routes
router.post("/joining-staff", joiningStaff);
router.get("/get-all-staff", getAllStaff);
router.delete("/remove-staff/:staffId", deleteStaff);

export default router