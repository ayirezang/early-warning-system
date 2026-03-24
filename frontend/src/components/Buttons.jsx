import React from "react";

const config = {
  blue: {
    bg: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
    value: "text-white",
  },
  amber: {
    bg: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
    value: "text-white",
  },
};

const Buttons = ({ icon, label, color, onClick }) => {
  const styles = config[color];
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-4 rounded-lg ${styles.bg} ${styles.value} font-bold text-sm sm:text-base shadow-sm transition-colors duration-150 cursor-pointer`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Buttons;

