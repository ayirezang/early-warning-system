import React, { useEffect, useState } from "react";
import StudentRow from "./StudentRow";
import { getMyStudentsApi } from "../api/api";

import useAuthStore from "../store/authStore";
import StudentRiskModal from "./StudentRiskModal";

const StudentTable = ({ refresh }) => {
  const teacherId = useAuthStore((state) => state.teacherId);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getMyStudentsApi(teacherId);
        setStudents(data.students);
      } catch (error) {
        console.error("failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) fetchStudents();
    else setLoading(false);
  }, [teacherId, refresh]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-sm">Loading students...</p>
      </div>
    );

  if (students.length === 0)
    return (
      <div className="flex items-center justify-center py-12 bg-white rounded-xl shadow-sm">
        <p className="text-gray-400 text-sm">No students found.</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Title bar */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Student Performance
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          {students.length} student{students.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>
      {/* table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full sm:min-w-150">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="hidden sm:table-cell text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4">
                Student ID
              </th>
              <th className="text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4">
                Name
              </th>
              <th className="hidden sm:table-cell text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4">
                SBA Score
              </th>
              <th className="hidden sm:table-cell text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4">
                Exam Score
              </th>
              <th className="text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onClick={() => student.hasScore && setSelectedStudent(student)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Student Risk Modal */}
      {selectedStudent && (
        <StudentRiskModal
          student={{
            firstName: selectedStudent.name.split(" ")[0],
            lastName: selectedStudent.name.split(" ")[1],
            studentId: selectedStudent.studentId,
            status:
              selectedStudent.score?.risk === "LOW" ? "on  Track" : "At Risk",
            sbaScore: selectedStudent.score?.sba,
            examScore: selectedStudent.score?.exam,
            analysis: {
              explanation: selectedStudent.score?.explanation,
              rootCause: selectedStudent.score?.rootCause,
              remedialPlan: selectedStudent.score?.remedialPlan || [],
              suggestedQuizTopics:
                selectedStudent.score?.suggestedQuizTopics || [],
            },
          }}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentTable;
