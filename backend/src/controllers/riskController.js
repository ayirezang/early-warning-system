import User from "../models/userModel.js";
import Student from "../models/student.js";
import SubjectScore from "../models/subjectScoreModel.js";
import axios from "axios";
import path from "path";
import { createAgentSession } from "@earendil-works/pi-coding-agent";

// Fallback rule-based prediction
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

// Get AI prediction using Pi Coding Agent
async function getAIPrediction(sbaScore, examScore, studentName, subjectName) {
  const workspaceDir = path.resolve("./agent-home");

  const { session } = await createAgentSession({
    workspaceDir: workspaceDir,
    configPath: path.join(workspaceDir, "AGENTS.md"),
  });

  let responseText = "";

  // Subscribe BEFORE prompting — this is the correct SDK pattern
  session.subscribe((event) => {
    console.log("EVENT RECEIVED:", JSON.stringify(event, null, 2));
  });
  // session.subscribe((event) => {
  //   if (
  //     event.type === "message_update" &&
  //     event.assistantMessageEvent?.type === "text_delta"
  //   ) {
  //     responseText += event.assistantMessageEvent.delta;
  //   }
  // });

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
// async function getAIPrediction(sbaScore, examScore, studentName, subjectName) {
//   const workspaceDir = path.resolve("./agent-home");

//   const { session } = await createAgentSession({
//     workspaceDir: workspaceDir,
//     configPath: path.join(workspaceDir, "AGENTS.md"),
//   });

//   // IMPORTANT: explicitly instruct it to read both files first,
//   // since automatic AGENTS.md loading was unreliable in testing
//   const prompt = `First, read AGENTS.md and then read brain/brain.md to load your persona, thresholds, and output schema rules.

// Once loaded, evaluate this student:
// Name: ${studentName || "Student"}
// Subject: ${subjectName || "Subject"}
// SBA Score: ${sbaScore}
// Exam Score: ${examScore}

// Respond ONLY with valid JSON matching the exact schema defined in brain.md. No markdown, no code fences, no extra text.`;

//   const promptResult = await session.prompt(prompt);

//   let responseText = "";

//   // Handle streamed/async iterable responses
//   if (
//     promptResult &&
//     typeof promptResult[Symbol.asyncIterator] === "function"
//   ) {
//     for await (const event of promptResult) {
//       if (
//         event.type === "message" ||
//         event.type === "content_block_delta" ||
//         event.delta
//       ) {
//         responseText += event.delta || event.content || event.text || "";
//       } else if (event.text) {
//         responseText += event.text;
//       }
//     }
//   } else if (typeof promptResult === "string") {
//     responseText = promptResult;
//   } else if (promptResult?.output) {
//     responseText =
//       typeof promptResult.output === "string"
//         ? promptResult.output
//         : JSON.stringify(promptResult.output);
//   } else if (promptResult?.content) {
//     responseText =
//       typeof promptResult.content === "string"
//         ? promptResult.content
//         : JSON.stringify(promptResult.content);
//   } else if (promptResult?.text) {
//     responseText = promptResult.text;
//   }

//   // Fallback: read from session message history if still empty
//   if (!responseText && typeof session.getMessages === "function") {
//     const messages = await session.getMessages();
//     const lastMsg = messages[messages.length - 1];
//     if (lastMsg) {
//       responseText =
//         typeof lastMsg.content === "string"
//           ? lastMsg.content
//           : Array.isArray(lastMsg.content)
//             ? lastMsg.content.map((c) => c.text || c).join("")
//             : JSON.stringify(lastMsg.content);
//     }
//   }

//   console.log("Raw Agent Response Extracted:", responseText);

//   if (
//     !responseText ||
//     responseText.trim() === "" ||
//     responseText === "undefined"
//   ) {
//     throw new Error("Agent response could not be extracted.");
//   }

//   // Clean markdown code fences and parse JSON
//   const cleaned = responseText
//     .replace(/```json/gi, "")
//     .replace(/```/g, "")
//     .trim();

//   const parsed = JSON.parse(cleaned);

//   console.log("Agentic AI prediction succeeded:", parsed);

//   return { ...parsed, source: "agentic-ai" };
// }
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
