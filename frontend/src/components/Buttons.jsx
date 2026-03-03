import React from "react";

const config = {
  blue: {
    bg: "bg-blue-600",
    icon: "text-white bg-white",
    value: "text-white",
  },
  amber: {
    bg: "bg-amber-600",
    icon: "text-white bg-white",
    value: "text-white",
  },
};

const Buttons = ({ icon, label, color, onClick }) => {
  const styles = config[color];

  return (
    <div
      onClick={onClick}
      className={`flex px-7 py-4 rounded-lg ${styles.bg} shadow-sm cursor-pointer`}
    >
      <div className={`flex items-center  gap-2 font-bold ${styles.value}`}>
        {icon} {label}
      </div>
    </div>
  );
};

export default Buttons;
