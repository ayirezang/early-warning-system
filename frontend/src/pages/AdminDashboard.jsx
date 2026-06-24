import React from "react";
import StatCard from "../components/StatCard";
import Header from "../components/Header";
import AdminStudentable from "../components/AdminStudentable";

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <StatCard label="Total Students" value={24} />
          <StatCard label="Total teachers" value={10} />
          <StatCard label="AT-risk students" value={8} />
        </div>
        <AdminStudentable />
      </main>
    </div>
  );
};

export default AdminDashboard;
