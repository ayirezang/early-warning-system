import React from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { FiUsers, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const Dashboard = () => {
  const stats = {
    totalStudents: 50,
    scoresEntered: 35,
    atRisk: 8,
  };
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="font-black text-3xl text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's your class performance overview
          </p>
        </div>
        <div className="flex gap-4 my-6">
          <StatCard
            label="total students"
            value={stats.totalStudents}
            color="blue"
            icon={<FiUsers size={20} />}
          />
          <StatCard
            label="scores Entered"
            value={stats.scoresEntered}
            color="green"
            icon={<FiCheckCircle size={20} />}
          />
          <StatCard
            label="At-Risk"
            value={stats.atRisk}
            color="red"
            icon={<FiAlertTriangle size={20} />}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
