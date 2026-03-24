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
      className={`flex justify-between p-4 sm:p-6 rounded-xl border-l-4 ${styles.border} ${styles.bg} shadow-sm hover:shadow-md transition-shadow duration-200 w-full`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm sm:text-md font-medium tracking-wide text-gray-500">
          {label}
        </span>
        <strong className={`text-2xl sm:text-4xl font-bold ${styles.value}`}>
          {value}
        </strong>
      </div>
      {icon && (
        <div
          className={`px-3 sm:px-5 py-1 rounded-lg ${styles.icon} text-2xl sm:text-4xl flex items-center`}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;

// import React from "react";
// const config = {
//   blue: {
//     border: "border-blue-500",
//     bg: "bg-white",
//     icon: "bg-blue-100 text-blue-600",
//     value: "text-blue-700",
//   },
//   green: {
//     border: "border-green-500",
//     bg: "bg-white",
//     icon: "bg-green-100 text-green-600",
//     value: "text-green-700",
//   },
//   red: {
//     border: "border-red-500",
//     bg: "bg-white",
//     icon: "bg-red-100 text-red-600",
//     value: "text-red-700",
//   },
// };

// const StatCard = ({ label, value, icon, color = "blue" }) => {
//   const styles = config[color];

//   return (
//     <div
//       className={`flex justify-between p-6 rounded-xl border-l-4 ${styles.border} ${styles.bg} shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 min-w-45 `}
//     >
//       <div className="flex flex-col gap-1">
//         <span className="text-md font-meduim   tracking wide">{label}</span>
//         <strong className={`text-4xl font-bold ${styles.value}`}>
//           {value}
//         </strong>
//       </div>
//       {icon && (
//         <div
//           className={`px-5 py-1 rounded-lg ${styles.icon} text-4xl flex items-center`}
//         >
//           {icon}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatCard;
