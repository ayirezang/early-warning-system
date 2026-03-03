import React from "react";

const statusConfig = {
  "On Track": "bg-green-100 text-green-700",
  "At Risk": "bg-red-100 text-red-700",
};

const StudentRow = ({ student }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      {/* Name */}
      <td className="px-6 py-4 font-semibold text-gray-900">{student.name}</td>

      {/* Student ID */}
      <td className="px-6 py-4 text-gray-500">{student.id}</td>

      {/* SBA Score */}
      <td className="px-6 py-4">
        {student.isAbsent ? (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            Absent
          </span>
        ) : student.hasScore ? (
          student.sba
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      {/* Exam Score */}
      <td className="px-6 py-4">
        {student.isAbsent ? (
          <span className="text-gray-400">-</span>
        ) : student.hasScore ? (
          student.exam
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {!student.hasScore ? (
          <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
            Pending
          </span>
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[student.status]}`}
          >
            {student.status}
          </span>
        )}
      </td>
    </tr>
  );
};

export default StudentRow;
