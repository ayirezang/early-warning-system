import React, { useEffect, useState } from "react";

import AdminStudentRow from "./AdminStudentRow";
import { getAdminStudentApi } from "../api/api";

const AdminStudentable = ({ refresh }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAdminStudentApi();
        setStudents(data.students);
      } catch (error) {
        console.error("failed to get students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [refresh]);
  if (loading)
    return (
      <div className="flex items-center justify-center py-12 ">
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
    <div className="bg-white  w-full ">
      <div className="overflow-x-auto">
        <table className="w-full min-w-150">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Student ID", "Name", "Year", "Programme", "Class"].map(
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
              <AdminStudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentable;
