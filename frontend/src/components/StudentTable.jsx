import React, { useEffect, useState } from "react";
import StudentRow from "./StudentRow";
import { getMyStudentsApi } from "../api/api";

import useAuthStore from "../store/authStore";

const StudentTable = ({ refresh }) => {
  const teacherId = useAuthStore((state) => state.teacherId);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <table className="w-full min-w-150">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Name", "Student ID", "SBA Score", "Exam Score", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="text-left text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide px-4 sm:px-6 py-3 sm:py-4"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <StudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
