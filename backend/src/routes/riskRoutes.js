import express from "express";
import {
  enterScore,
  getMyStudents,
  getAtRiskStudents,
  getAllStudents,
} from "../controllers/riskController.js";
import Student from "../models/student.js";
const router = express.Router();

router.post("/enter", enterScore);
router.get("/students", getMyStudents);
router.get("/at-risk", getAtRiskStudents);
router.get("/all-students", getAllStudents);


export default router;
