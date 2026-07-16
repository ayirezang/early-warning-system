import Student from "../models/student.js";

export const addStudent = async (req, res) => {
  try {
    const { firstName, lastName, year, programme } = req.body;
    //validate fiels
    if (!firstName || !lastName || !year || !programme) {
      return res.status(400).json({
        success: false,
        error: "missing fields",
      });
    }
    //
    const lastStudent = await Student.findOne({ studentId: /^ST-\d+$/ })
      .sort({ studentId: -1 })
      .collation({ locale: "en_US", numericOrdering: true });

    let nextNumber = 1;
    if (lastStudent) {
      const lastNum = parseInt(lastStudent.studentId.split("-")[1], 10);
      nextNumber = lastNum + 1;
    }
    const studentId = `ST-${String(nextNumber).padStart(3, "0")}`;

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
