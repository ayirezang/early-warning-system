import React from "react";

const AdminStudentRow = ({ student }) => {
  
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.year}</td>
      <td>{student.programme}</td>
      <td>{student.class}</td>
    </tr>
  );
};

export default AdminStudentRow;
