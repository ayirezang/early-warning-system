import User from "../models/userModel.js";
import Student from "../models/student.js";
import SubjectScore from "../models/subjectScoreModel.js";
import axios from "axios";
import path from "path";
import os from "os";
import { createAgentSession, ModelRuntime } from "@earendil-works/pi-coding-agent";
import { existsSync, readdirSync, mkdirSync, writeFileSync, chmodSync } from "fs";

let _runtime = null;
let _configEnsured = false;

function ensurePiAgentConfig() {
  if (_configEnsured) return;
  _configEnsured = true;
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn("OPENROUTER_API_KEY not set — agentic AI will fall back to rule-based");
    return;
  }
  const piDir = path.join(os.homedir(), ".pi", "agent");
  const authPath = path.join(piDir, "auth.json");
  const settingsPath = path.join(piDir, "settings.json");

  if (!existsSync(piDir)) mkdirSync(piDir, { recursive: true });

  if (!existsSync(authPath)) {
    writeFileSync(authPath, JSON.stringify({ openrouter: { type: "api_key", key: apiKey } }), {
      encoding: "utf-8",
      mode: 0o600,
    });
    chmodSync(authPath, 0o600);
  }
  if (!existsSync(settingsPath)) {
    writeFileSync(
      settingsPath,
      JSON.stringify({
        defaultProvider: "openrouter",
        defaultModel: "cohere/north-mini-code:free",
        maxTokens: 4096,
        defaultThinkingLevel: "high",
      }),
      { encoding: "utf-8", mode: 0o600 },
    );
  }
}

async function getRuntime() {
  if (_runtime) return _runtime;
  ensurePiAgentConfig();
  _runtime = await ModelRuntime.create();
  return _runtime;
}

// Fallback rule-based prediction
function getRuleBasedPrediction(sbaScore, examScore) {
  const totalScore = sbaScore * 0.3 + examScore * 0.7;
  const isHighRisk = totalScore < 50 || sbaScore < 45 || examScore < 45;
  return {
    willFailSubject: totalScore < 50,
    riskCategory: isHighRisk ? "HIGH" : "LOW",
    riskPercent: Math.round(totalScore),
    explanation: isHighRisk
      ? `Student is at risk with a weighted score of ${Math.round(totalScore)}%. Requires immediate intervention.`
      : `Student is on track with a weighted score of ${Math.round(totalScore)}%.`,
    rootCause: sbaScore < examScore
      ? "Performance is weaker in Continuous Assessment (SBA) compared to exams."
      : "Performance is weaker in Exams compared to Continuous Assessment (SBA).",
    remedialPlan: [
      "Schedule one-on-one tutoring sessions focused on weak areas.",
      "Provide additional practice exercises and past question papers.",
      "Monitor progress through weekly quizzes and feedback sessions.",
    ],
    suggestedQuizTopics: [
      "Core subject fundamentals",
      "Problem-solving techniques",
    ],
    source: "rule-based",
  };
}

// Get AI prediction using Pi Coding Agent
async function getAIPrediction(sbaScore, examScore, studentName, subjectName) {
  const workspaceDir = path.resolve("./agent-home");

console.log("Resolved workspaceDir:", workspaceDir);
console.log("Contents:", existsSync(workspaceDir) ? readdirSync(workspaceDir) : "MISSING");
console.log("AGENTS.md exists?", existsSync(path.join(workspaceDir, "AGENTS.md")));
console.log("brain.md exists?", existsSync(path.join(workspaceDir, "brain", "brain.md")));

  const modelRuntime = await getRuntime();

  const { session } = await createAgentSession({
    cwd: workspaceDir,
    modelRuntime,
  });

  let responseText = "";

  session.subscribe((event) => {
    if (
      event.type === "message_update" &&
      event.assistantMessageEvent?.type === "text_delta"
    ) {
      responseText += event.assistantMessageEvent.delta;
    }
  });

  const prompt = `First, read AGENTS.md and then read brain/brain.md to load your persona, thresholds, and output schema rules.

Once loaded, evaluate this student:
Name: ${studentName || "Student"}
Subject: ${subjectName || "Subject"}
SBA Score: ${sbaScore}
Exam Score: ${examScore}

Respond ONLY with valid JSON matching the exact schema defined in brain.md. No markdown, no code fences, no extra text.`;

  await session.prompt(prompt);

  console.log("Raw Agent Response Extracted:", responseText);

  if (!responseText || responseText.trim() === "") {
    throw new Error("Agent response could not be extracted.");
  }

  const cleaned = responseText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  console.log("Agentic AI prediction succeeded:", parsed);

  return { ...parsed, source: "agentic-ai" };
}

// Enter score
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
    if (
      !teacherId ||
      !studentId ||
      sbaScore === undefined ||
      examScore === undefined
    ) {
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
      const studentName = `${student.firstName} ${student.lastName}`;
      const subjectName = teacher.subject;

      aiPrediction = await getAIPrediction(
        sbaScore,
        examScore,
        studentName,
        subjectName,
      );
    } catch (aiError) {
      console.error(
        "Agentic AI prediction failed, using fallback:",
        aiError.message,
      );
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

// Get teacher's students
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

    // Get all active students
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
                explanation: score.aiPrediction.explanation,
                rootCause: score.aiPrediction.rootCause,
                remedialPlan: score.aiPrediction.remedialPlan,
                suggestedQuizTopics: score.aiPrediction.suggestedQuizTopics,
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

// Get at-risk students
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

    // Get all high and low risk students
    const atRiskScores = await SubjectScore.find({
      teacherId,
      academicYear,
      semester,
      "aiPrediction.riskCategory": { $in: ["HIGH", "LOW"] },
    })
      .populate("studentId")
      .sort({ "aiPrediction.riskPercent": -1 });

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

// Get all students (for dropdown)
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
