import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subjectScoreSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
      enum: ["1", "2"],
    },
    subject: {
      type: String,
      required: true,
      enum: ["English", "Science", "Mathematics", "Social Studies"],
    },
    sbaScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    examScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    aiPrediction: {
      willFailSubject: {
        type: Boolean,
        required: true,
      },

      riskCategory: {
        type: String,
        required: true,
        enum: ["LOW", "HIGH"],
      },
      explanation: {
        type: String,
      },
      source: {
        type: String,
        enum: ["ai", "rule-based"],
      },
    },
    enteredBy: {
      type: String,
    },
    className: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

// prevent duplicate data entry

subjectScoreSchema.index(
  { studentId: 1, subject: 1, academicYear: 1, semester: 1 },
  { unique: true },
);

subjectScoreSchema.index({ teacherId: 1, academicYear: 1, semester: 1 });

const SubjectScore = mongoose.model("SubjectScore", subjectScoreSchema);

export default SubjectScore;
