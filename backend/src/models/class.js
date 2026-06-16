import mongoose from "mongoose";
const Schema = mongoose.Schema;
const classSchema = newSchema(
  {
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
        "General Science",
        "Business",
        "Visual Arts",
        "Home Economics",
      ],
    },
    className: {
      type: Sting,
    },
    teachers: [
      {
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        subject: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Class = mongoose.model("Class", classSchema);
export default Class;
