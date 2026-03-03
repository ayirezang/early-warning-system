import React from "react";
import StudentRow from "./StudentRow";

const students = [
  { id: "S-001", name: "Emma Wilson", sba: 75, exam: 80, status: "On Track", hasScore: true, isAbsent: false },
  { id: "S-002", name: "James Chen", sba: 40, exam: 35, status: "At Risk", hasScore: true, isAbsent: false },
  { id: "S-003", name: "Sophia Rodriguez", sba: 85, exam: 90, status: "On Track", hasScore: true, isAbsent: false },
  { id: "S-004", name: "Marcus Johnson", sba: 0, exam: 0, status: "At Risk", hasScore: true, isAbsent: true },
  { id: "S-005", name: "Olivia Smith", sba: 60, exam: 55, status: "At Risk", hasScore: true, isAbsent: false },
  { id: "S-006", name: "Aiden Brown", hasScore: false, isAbsent: false },
];

const StudentTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Name</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Student ID</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">SBA Score</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Exam Score</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;