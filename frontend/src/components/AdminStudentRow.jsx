import React from "react";

const AdminStudentRow = ({ student }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td>{student.studentId}</td>
      <td>{student.firstName} {student.lastName} </td>
      <td>{student.year}</td>
      <td>{student.programme}</td>
      <td>{student.className}</td>
    </tr>
  );
};

export default AdminStudentRow;
