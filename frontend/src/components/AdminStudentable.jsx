import React, { useEffect, useState } from "react";

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
        console.error("failed to get students");
      } finally {
        setLoading(false);
      }
    }

  },[]);
  return (
    <div className="bg-white  w-full ">
      <div className="flex justify-between">
        <h2>students</h2>
        <button className="px-4 py-2 gb-blue-200">add student</button>
      </div>
      <table className="w-full">
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
          {/* <tr>
            <td>0000</td>
            <td>Asare Puis</td>
            <td>SHS2</td>
            <td>Visual Arts</td>
            <td>2VA1</td>
          </tr> */}
          {students.map((student) => {
            return <AdminStudentRow key={student.id} student={student} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentable;
