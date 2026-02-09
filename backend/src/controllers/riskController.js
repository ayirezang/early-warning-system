const { calculateRisk } = require("../utils/mlCalculator");

//get alist of students who are at risk
exports.getAllRisks = async (req, res) => {
  try {
    const students = [
      {
        name: "kofi Mensah",
        attendance: 70,
        englishSBA: 40,
        mathsSBA: 67,
        integSciSBA: 50,
        socialstudies: 60,
      },
      {
        name: "Abugah Jonathan",
        attendance: 62,
        englishSBA: 45,
        mathsSBA: 50,
        integSciSBA: 55,
        socialstudies: 60,
      },
      {
        name: "kweku Manu",
        attendance: 40,
        englishSBA: 38,
        mathsSBA: 48,
        integSciSBA: 60,
        socialstudies: 40,
      },
    ];
    const risks = students.map((student) => {
      const prediction = calculateRisk(student);
      return { ...student, prediction };
    });
    risks.sort((a, b) => b.prediction.riskPercent - a.prediction.riskPercent);
    res.json({
      status: "success",
      message: "successfully listed all students at risk",
      data: risks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "server error" });
  }
};
//get risk for a single student
exports.predictSingleRisk = async (req, res) => {
  try {
    const student = req.body;
    //validation
    const requiredFields = [
      "attendance",
      "englishSBA",
      "mathsSBA",
      "integSciSBA",
      "socialstudies",
    ];
    //
    for (const field of requiredFields) {
      if (
        student[field] === undefined ||
        student[field] === null ||
        typeof student[field] !== "number"
      ) {
        return res.status(400).json({
          status: "fail",
          message: `${field} is required and must be a number`,
        });
      }
    }
    //attendance validation
    if (student.attendance < 0 || student.attendance > 100) {
      return res.status(400).json({
        status: "fail",
        message: "attendance must be between 0 and 100",
      });
    }
    //sba validation
    const sbaFields = [
      "englishSBA",
      "mathsSBA",
      "integSciSBA",
      "socialstudies",
    ];
    for (const field of sbaFields) {
      if (student[field] < 0 || student[field] > 100) {
        return res.status(400).json({
          status: "fail",
          message: `${field} must be between 0 and 100`,
        });
      }
    }
    //calculate risk
    const prediction = calculateRisk(student);
    res.json({
      status: "success",
      message: "successfully calculated risk",
      prediction,
    });
  } catch (error) {
    console.log("prediction error:", error);
    res.status(500).json({ error: error.message || "server error" });
  }
};
