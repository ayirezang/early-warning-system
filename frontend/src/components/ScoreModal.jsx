import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import { enterScoreApi, getAllStudentsApi } from "../api/api";

const ScoreModal = ({ onClose, onSuccess }) => {
  const { teacherId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: "",
    semester: "",
    sbaScore: "",
    examScore: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudentsApi();
        setStudents(data.students);
      } catch (error) {
        console.error("failed to fetch students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await enterScoreApi({
        teacherId,
        studentId: formData.studentId,
        academicYear: formData.academicYear,
        semester: formData.semester,
        sbaScore: Number(formData.sbaScore),
        examScore: Number(formData.examScore),
      });
      const risk = data.data.aiPrediction.riskCategory;
      alert(`Student is ${risk === "LOW" ? "On Track" : "At Risk"}`);
      onSuccess();
      onClose();
    } catch (error) {
      alert(
        "Failed to enter score: " +
          (error.response?.data?.error || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const academicYear = ["1", "2", "3"];

  const inputClass =
    "border border-gray-300 rounded-lg w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "text-sm sm:text-md font-semibold text-gray-700";

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-3xl sm:mx-4 p-0 overflow-hidden shadow-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="bg-blue-600 flex justify-between items-start p-4 sm:p-5 text-white shrink-0">
          <div>
            <h1 className="font-bold text-lg sm:text-2xl">
              Enter Student Score
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Add new assessment scores and get AI-powered risk prediction
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:bg-blue-500 p-2 rounded-lg transition shrink-0 ml-4"
          >
            <RxCross1 size={18} />
          </button>
        </header>

        {/* Scrollable body */}
        <main className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col gap-4">
            {/* Student Name + Academic Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Student Name *</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a student...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Academic Year *</label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select year...</option>
                  {academicYear.map((year) => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester + SBA Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Semester *</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select semester...</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>SBA Score (0–100) *</label>
                <input
                  name="sbaScore"
                  value={formData.sbaScore}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter SBA score"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Exam Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Exam Score (0–100) *</label>
                <input
                  name="examScore"
                  value={formData.examScore}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter exam score"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
              >
                {loading ? "Predicting..." : "Get Prediction"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScoreModal;
