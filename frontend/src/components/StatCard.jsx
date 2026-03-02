import React from "react";
const config = {
  blue: {
    border: "border-blue-500",
    bg: "bg-white",
    icon: "bg-blue-100 text-blue-600",
    value: "text-blue-700",
  },
  green: {
    border: "border-green-500",
    bg: "bg-white",
    icon: "bg-green-100 text-green-600",
    value: "text-green-700",
  },
  red: {
    border: "border-red-500",
    bg: "bg-white",
    icon: "bg-red-100 text-red-600",
    value: "text-red-700",
  },
};

const StatCard = ({ label, value, icon, color = "blue" }) => {
  const styles = config[color];

  return (
    <div
      className={`flex justify-between p-5 rounded-xl border-l-4 ${styles.border} ${styles.bg} shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 min-w-45 `}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-meduim  text-gray-500 tracking wide">
          {label}
        </span>
        <strong className={`text-4xl font-bold ${styles.value}`}>
          {value}
        </strong>
      </div>
      {icon && (
        <div className={`p-3 rounded-full ${styles.icon} text-2xl`}>{icon}</div>
      )}
    </div>
  );
};

export default StatCard;
