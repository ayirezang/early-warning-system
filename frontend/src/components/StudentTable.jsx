import React, { useContext, useEffect, useState } from "react";
import StudentRow from "./StudentRow";
import { getMyStudentsApi } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const StudentTable = () => {
  const { teacherId } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getMyStudentsApi(teacherId, "1", "1");
        setStudents(data.students);
      } catch (error) {
        console.error("failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };
    if (teacherId) fetchStudents();
  }, [teacherId]);
  if (loading) return <p className="text-gray-500">Loading students...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left text-sm font-semibold  uppercase tracking-wide px-6 py-4">
              Name
            </th>
            <th className="text-left text-sm font-semibold  uppercase tracking-wide px-6 py-4">
              Student ID
            </th>
            <th className="text-left text-sm font-semibold  uppercase tracking-wide px-6 py-4">
              SBA Score
            </th>
            <th className="text-left text-sm font-semibold  uppercase tracking-wide px-6 py-4">
              Exam Score
            </th>
            <th className="text-left text-sm font-semibold uppercase tracking-wide px-6 py-4">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
