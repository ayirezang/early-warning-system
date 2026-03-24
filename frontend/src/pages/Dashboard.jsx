import React, { useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { FiUsers, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { PiWarningCircleLight } from "react-icons/pi";
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
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-black text-2xl sm:text-3xl text-gray-900 mb-1 sm:mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Welcome back! Here's your class performance overview
          </p>
        </div>

        {/* Stat cards: 1 col on mobile, 3 on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
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
            label="At-Risk Students"
            value={stats.atRisk}
            color="red"
            icon={<FiAlertTriangle size={20} />}
          />
        </div>

        {/* Buttons: stack on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Buttons
            icon={<GoPlus size={24} />}
            label="Enter new score"
            color="blue"
            onClick={() => setIsOpen(true)}
          />
          <Buttons
            icon={<PiWarningCircleLight size={24} />}
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

