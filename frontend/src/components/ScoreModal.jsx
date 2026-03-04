import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../context/AuthContext";
import { enterScoreApi, getAllStudentsApi } from "../api/api";

const ScoreModal = ({ onClose, onSuccess }) => {
  const { teacherId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  //form state
  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: "",
    semester: "",
    sbaScore: "",
    examScore: "",
  });
  //fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudentsApi();
        setStudents(data.students);
      } catch (error) {
        console.error("failed to fetch students:", error);
        console.log();
      }
    };
    fetchStudents();
  }, []);
  //academic year

  //handlechange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //handlesubmit
  const handleSubmit = async () => {
    console.log("teacherId:", teacherId);
    console.log("formData:", formData);
    console.log("sending:", {
      teacherId,
      studentId: formData.studentId,
      academicYear: formData.academicYear,
      semester: formData.semester,
      sbaScore: Number(formData.sbaScore),
      examScore: Number(formData.examScore),
    });

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
      // alert(`Student is ${risk === "LOW" ? " On Track" : " At Risk"}`);
      onSuccess();
      onClose();
    } catch (error) {
      alert(
        "failed to enter score :" + error.response?.data?.error ||
          error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const academicYear = ["1", "2", "3"];
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-3xl mx-4 p-0 overflow-hidden shadow-2xl  max-h-[90vh] "
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-blue-600 flex justify-between p-5 text-white ">
          <div>
            <h1 className="font-bold text-2xl ">Enter Student Score</h1>
            <p className="text-blue-100 text-sm mt-1">
              Add new assessment scores and get AI-powered risk prediction
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:bg-blue-500 px-2 py-1 rounded-lg transition"
          >
            <RxCross1 size={20} />
          </button>
        </header>
        <main className="mt-8 bg-white px-6 pb-6">
          <form>
            {/**name and academic year */}
            <div className="grid grid-cols-2 gap-4">
              {/**name */}
              <div className="flex flex-col gap-2">
                <label className="text-md font-semibold">Student Name *</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2"
                >
                  <option value="">Select a student...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>
              {/**academic */}
              <div className="flex flex-col gap-2">
                <label className="text-md font-semibold">
                  Academic Year *
                </label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2"
                >
                  <option value="">Select year...</option>
                  {academicYear.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/**semester and sba score */}
            {/**semester */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="flex flex-col gap-2">
                <label className="text-md font-semibold  ">
                  Semester *
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2"
                >
                  <option value="">Select semester...</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                </select>
              </div>

              {/**sba score */}
              <div className="flex flex-col gap-2">
                <label className="text-md font-semibold  ">
                  SBA Score (0-100) *
                </label>
                <input
                  name="sbaScore"
                  value={formData.sbaScore}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter SBA score"
                  className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
            </div>
            {/**exam score */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-md  font-semibold mt-2 ">
                  Exam Score(0-100)
                </label>
                <input
                  name="examScore"
                  value={formData.examScore}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter SBA score"
                  className="border border-gray-300 rounded-lg  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
              {/**attendance */}
              {/* <div className="flex flex-col gap-2">
                <label className="text-md  text-gray-700 font-semibold mt-2 ">
                  Attendance(0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter attendance"
                  className="border border-gray-300 rounded-lg  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div> */}
            </div>
            {/** buttons*/}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className=" flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className=" flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98"
              >
                {loading ? "Predicting.." : "Get  Prediction"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ScoreModal;
