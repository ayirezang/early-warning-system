import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import AddStudentModal from "./AddStudentModal";
import AdminStudentRow from "./AdminStudentRow";
import { getAdminStudentApi } from "../api/api";

const AdminStudentable = () => {
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
  }, []);
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
      <div className="flex justify-between">
        <h2>students</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-150">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Name", "Student ID", "Name", "YEAR", "PROGRAMME", "CLASS"].map(
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
      {/* <table className="w-full min-w-150">
        <thead>
          <tr className="">
            <th>Student ID</th>
            <th>Name</th>
            <th>YEAR</th>
            <th>PROGRAMME</th>
            <th>CLASS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return <AdminStudentRow key={student.id} student={student} />;
          })}
        </tbody>
        </div>
      </table> */}
    </div>
  );
};

export default AdminStudentable;
