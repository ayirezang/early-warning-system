const express = require("express");
const {
  enterScore,
  getMyStudents,
  getAtRiskStudents,
  getAllStudents,
} = require("../controllers/riskController");
const router = express.Router();

router.post("/enter", enterScore);
router.get("/students", getMyStudents);
router.get("/at-risk", getAtRiskStudents);
router.get("/all-students", getAllStudents);

module.exports = router;
