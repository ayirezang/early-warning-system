const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    currentYear: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    currentSemester: {
      type: Number,
      required: true,
      min: 1,
      max: 2,
    },
    attendance: {
      type: Number,
      default: 100,
      min: 1,
      max: 100,
    },
    currentRiskCategory: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "UNKNOWN",
    },
    currentRiskPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
