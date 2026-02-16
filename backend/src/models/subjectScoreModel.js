const mongoose = require("mongoose");
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
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    subject: {
      type: String,
      required: true,
      enum: ["English", "Science", "Mathematics ", "Social Studies"],
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

      riskPercent: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      riskCategory: {
        type: String,
        required: true,
        enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      },
    },
    enteredBy: {
      type: String,
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
module.exports = SubjectScore;
