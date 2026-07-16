import User from "../models/userModel.js";
import Student from "../models/student.js";
import SubjectScore from "../models/subjectScoreModel.js";
import axios from "axios";

function getRuleBasedPrediction(sbaScore, examScore) {
  const totalScore = sbaScore * 0.3 + examScore * 0.7;
  return {
    willFailSubject: totalScore < 50,
    riskCategory: totalScore >= 50 ? "LOW" : "HIGH",
    explanation:
      "Rule-based prediction: If total score < 50, student is at risk of failing. Otherwise, low risk.",
    source: "rule-based",
  };
}

// get ai prediction
async function getAIPrediction(sbaScore, examScore) {
  const prompt = `Given the following scores: SBA Score: ${sbaScore}, Exam Score: ${examScore}, predict if the student is at risk of failing the subject. Respond with ONLY valid JSON, no markdown, no code fences, in exactly this shape: {"riskCategory": "LOW" | "HIGH", "willFailSubject": true | false, "explanation": "one short sentence"}`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "poolside/laguna-m.1:free",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    },
  );

  const raw = response.data.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  console.log("AI prediction succeeded:", parsed);

  return { ...parsed, source: "ai" };
}

//enter score
export const enterScore = async (req, res) => {
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
    let aiPrediction;
    try {
      aiPrediction = await getAIPrediction(sbaScore, examScore);
    } catch (aiError) {
      console.error("AI prediction failed, using fallback:", aiError.message);
      aiPrediction = getRuleBasedPrediction(sbaScore, examScore);
    }

    const subjectScore = new SubjectScore({
      studentId,
      teacherId,
      academicYear,
      semester,
      subject: teacher.subject,
      className: student.className,
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
          aiPrediction.riskCategory === "HIGH"
            ? `AI predicts HIGH risk: ${aiPrediction.explanation}`
            : null,
      },
    });
  } catch (error) {
    console.error("Enter score error:", error);
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
export const getMyStudents = async (req, res) => {
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

    // get all students
    const students = await Student.find({ isActive: true });

    // Check which students have scores entered
    const studentsWithStatus = await Promise.all(
      students.map(async (student) => {
        const query = {
          studentId: student._id,
          teacherId,
          subject: teacher.subject,
        };

        if (academicYear) query.academicYear = academicYear;
        if (semester) query.semester = semester;
        const score = await SubjectScore.findOne(query);

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
export const getAtRiskStudents = async (req, res) => {
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

    // Get all high and critical risk students
    const atRiskScores = await SubjectScore.find({
      teacherId,
      academicYear,
      semester,
      "aiPrediction.riskCategory": { $in: ["HIGH", "LOW"] },
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

// 4. get all sytudents (for dropdown)

export const getAllStudents = async (req, res) => {
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
