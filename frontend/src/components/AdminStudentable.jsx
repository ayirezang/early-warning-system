import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

import AdminStudentRow from "./AdminStudentRow";
import { getAdminStudentApi } from "../api/api";

const AdminStudentable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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
    };
  }, []);
  return (
    <div className="bg-white  w-full ">
      <div className="flex justify-between">
        <h2>students</h2>
        <button
          className="px-4 py-2 bg-blue-200 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-300 text-white "
          onClick={() => setOpen(true)}
        >
          <GoPlus />
          add student
        </button>
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
          
          {students.map((student) => {
            return <AdminStudentRow key={student.id} student={student} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentable;
