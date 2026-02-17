const User = require("../models/userModel");
const Student = require("../models/student");
const SubjectScore = require("../models/subjectScoreModel");
const subjectAI = require("../ml/subjectAI");

// 1. ENTER SCORE (AI predicts automatically)

exports.enterScore = async (req, res) => {
  try {
    const {
      teacherId,
      studentId,
      academicYear,
      semester,
      sbaScore,
      examScore,
    } = req.body;

    // Validate required fields
    if (!teacherId || !studentId || !sbaScore || !examScore) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Get teacher
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: "Teacher not found",
      });
    }

    // Get student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student not found",
      });
    }

    // USE AI TO PREDICT RISK
    const aiPrediction = subjectAI.predictSubjectRisk(
      student.attendance,
      sbaScore,
      examScore,
    );

    // Save score with AI prediction
    const subjectScore = new SubjectScore({
      studentId,
      teacherId,
      academicYear,
      semester,
      subject: teacher.subject,
      sbaScore,
      examScore,
      aiPrediction,
      enteredBy: `${teacher.firstName} ${teacher.lastName}`,
    });

    await subjectScore.save();

    // Update student's current risk
    student.currentRiskCategory = aiPrediction.riskCategory;
    student.currentRiskPercent = aiPrediction.riskPercent;
    await student.save();

    // Send response
    res.json({
      success: true,
      message: "Score entered successfully",
      data: {
        student: `${student.firstName} ${student.lastName}`,
        subject: teacher.subject,
        scores: { sba: sbaScore, exam: examScore },
        aiPrediction,
        warning:
          aiPrediction.riskCategory === "HIGH" ||
          aiPrediction.riskCategory === "CRITICAL"
            ? `⚠️ AI predicts ${aiPrediction.riskCategory} risk: ${aiPrediction.riskPercent}% chance of failing`
            : null,
      },
    });
  } catch (error) {
    console.error("Enter score error:", error);

    // Check if it's a duplicate entry error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error:
          "Score already entered for this student in this subject and semester",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 2. GET MY STUDENTS

exports.getMyStudents = async (req, res) => {
  try {
    const { teacherId, academicYear, semester } = req.query;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        error: "Teacher ID is required",
      });
    }

    const teacher = await User.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: "Teacher not found",
      });
    }

    // Get all students
    const students = await Student.find({ isActive: true });

    // Check which students have scores entered
    const studentsWithStatus = await Promise.all(
      students.map(async (student) => {
        const score = await SubjectScore.findOne({
          studentId: student._id,
          teacherId,
          subject: teacher.subject,
          academicYear,
          semester,
        });

        return {
          id: student._id,
          studentId: student.studentId,
          name: `${student.firstName} ${student.lastName}`,
          attendance: student.attendance,
          hasScore: !!score,
          score: score
            ? {
                sba: score.sbaScore,
                exam: score.examScore,
                risk: score.aiPrediction.riskCategory,
                riskPercent: score.aiPrediction.riskPercent,
              }
            : null,
        };
      }),
    );

    res.json({
      success: true,
      subject: teacher.subject,
      totalStudents: students.length,
      scoresEntered: studentsWithStatus.filter((s) => s.hasScore).length,
      students: studentsWithStatus,
    });
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3. GET AT-RISK STUDENTS
exports.getAtRiskStudents = async (req, res) => {
  try {
    const { teacherId, academicYear, semester } = req.query;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        error: "Teacher ID is required",
      });
    }

    const teacher = await User.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: "Teacher not found",
      });
    }

    // Get all HIGH and CRITICAL risk students
    const atRiskScores = await SubjectScore.find({
      teacherId,
      academicYear,
      semester,
      "aiPrediction.riskCategory": { $in: ["HIGH", "CRITICAL"] },
    })
      .populate("studentId")
      .sort({ "aiPrediction.riskPercent": -1 }); // Highest risk first

    const students = atRiskScores.map((score) => ({
      student: {
        id: score.studentId._id,
        studentId: score.studentId.studentId,
        name: `${score.studentId.firstName} ${score.studentId.lastName}`,
        attendance: score.studentId.attendance,
      },
      scores: {
        sba: score.sbaScore,
        exam: score.examScore,
      },
      aiPrediction: score.aiPrediction,
      enteredAt: score.createdAt,
    }));

    res.json({
      success: true,
      subject: teacher.subject,
      semester: `Year ${academicYear}, Semester ${semester}`,
      totalAtRisk: students.length,
      students,
    });
  } catch (error) {
    console.error("Get at-risk students error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 4. GET ALL STUDENTS (for dropdown)

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ isActive: true })
      .select(
        "studentId firstName lastName attendance currentYear currentSemester",
      )
      .sort({ firstName: 1 });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Get all students error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
