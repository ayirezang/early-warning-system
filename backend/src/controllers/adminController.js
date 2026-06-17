import Student from "../models/student.js";

export const addStudent = async (req, res) => {
  try {
    const { studentId, firstName, lastName, year, programme } = req.body;
    //validate fiels
    if (!studentId || !firstName || !lastName || !year || !programme) {
      return res.status(400).json({
        success: false,
        error: "missing fields",
      });
    }
    const className = `${year} - ${programme}`;
    const student = new Student({
      studentId,
      firstName,
      lastName,
      year,
      programme,
      className,
    });
    await student.save();
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ isActive: true });
    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
