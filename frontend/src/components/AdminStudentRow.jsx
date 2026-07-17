import React from "react";

const AdminStudentRow = ({ student }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm text-gray-900 whitespace-nowrap">
        {student.studentId}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 whitespace-nowrap">
        {student.firstName} {student.lastName}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 whitespace-nowrap">
        {student.year}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 whitespace-nowrap">
        {student.programme}
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-700 whitespace-nowrap">
        {student.className}
      </td>
    </tr>
  );
};

export default AdminStudentRow;

// import React from "react";

// const AdminStudentRow = ({ student }) => {
//   return (
//     <tr className="hover:bg-gray-50 transition-colors duration-150">
//       <td>{student.studentId}</td>
//       <td>{student.firstName} {student.lastName} </td>
//       <td>{student.year}</td>
//       <td>{student.programme}</td>
//       <td>{student.className}</td>
//     </tr>
//   );
// };

// export default AdminStudentRow;
