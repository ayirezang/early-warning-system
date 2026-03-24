import React from "react";

const StudentRow = ({ student }) => {
  const status =
    student.score?.risk === "LOW"
      ? "On Track"
      : student.score?.risk === "HIGH"
        ? "At Risk"
        : null;

  const statusStyle = {
    "On Track": "bg-green-100 text-green-700",
    "At Risk": "bg-red-100 text-red-700",
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm text-gray-900 whitespace-nowrap">
        {student.name}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 whitespace-nowrap">
        {student.studentId}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700">
        {student.hasScore ? (
          student.score.sba
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700">
        {student.hasScore ? (
          student.score.exam
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        {!student.hasScore ? (
          <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap">
            Pending
          </span>
        ) : (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyle[status]}`}
          >
            {status}
          </span>
        )}
      </td>
    </tr>
  );
};

export default StudentRow;

