import React, { useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { FiUsers, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { PiWarningCircleLight } from "react-icons/pi";
import { MdOutlineTrendingUp } from "react-icons/md";

import { GoPlus } from "react-icons/go";
import Buttons from "../components/Buttons";
import ScoreModal from "../components/ScoreModal";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const stats = {
    totalStudents: 50,
    classAverage: 74.5,
    atRisk: 8,
  };
  return (
    <div>
      <Header />
      <main className="w-full  px-6 sm:px-6 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-black text-3xl text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's your class performance overview
          </p>
        </div>
        {/**stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 ">
          <StatCard
            label="Total Students"
            value={stats.totalStudents}
            color="blue"
            icon={<FiUsers size={20} />}
          />
          <StatCard
            label="Class Average"
            value={stats.classAverage}
            color="green"
            icon={<FiCheckCircle size={20} />}
          />
          <StatCard
            label="
                At-Risk
                 Students"
            value={stats.atRisk}
            color="red"
            icon={<FiAlertTriangle size={20} />}
          />
          {/* <StatCard
            label="At-Risk"
            value={stats.atRisk}
            color="red"
            icon={<MdOutlineTrendingUp size={20} />}
          /> */}
        </div>
        <div className="flex gap-4 mb-8">
          <Buttons
            icon={<GoPlus size={30} />}
            label="Enter new score"
            color="blue"
            onClick={() => setIsOpen(true)}
          />
          <Buttons
            icon={<PiWarningCircleLight size={30} />}
            label="View At-Risk Students"
            color="amber"
            onClick={() => setIsOpen(true)}
          />
        </div>
        {isOpen && (
          <ScoreModal
            onClose={() => setIsOpen(false)}
            onSuccess={() => setRefresh((prev) => prev + 1)}
          />
        )}
        <div>
          <StudentTable refresh={refresh} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
