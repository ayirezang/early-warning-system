const express = require("express");
const {
  predictSingleRisk,
  getAllRisks,
} = require("../controllers/riskController");
const router = express.Router();

//list all students with risks
router.get("/risks", getAllRisks);

// calculate risk for a single student
router.post("/predict", predictSingleRisk);

module.exports = router;
