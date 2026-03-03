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

router.post("/add-student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
