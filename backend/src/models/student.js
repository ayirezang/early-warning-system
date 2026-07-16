import mongoose from "mongoose";
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
    className: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      enum: ["SHS 1", "SHS 2", "SHS 3"],
    },
    programme: {
      type: String,
      required: true,
      enum: [
        "General Arts",
        " General Science",
        "Business",
        "Visual Arts",
        "Home Economics",
      ],
    },

    currentRiskCategory: {
      type: String,
      enum: ["LOW", "HIGH", "UNKNOWN"],
      default: "UNKNOWN",
    },
    currentRiskPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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

export default Student;
