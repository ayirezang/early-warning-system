import React from "react";
import { FiShield } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";

const Header = () => {
  return (
    <div>
      <header
        className=" border-b border-gray-200 shadow-md 
      "
      >
        <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 ">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              {/**erly warning  */}
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Early warning system
                </h1>
                <p className="text-xs text-gray-600">
                  Student Performance monitoring{" "}
                </p>
              </div>
            </div>
            {/**name and subject */}
            <div className="flex items-center gap-4">
              <div className="">
                <p className="text-black text-lg">Ms.Pat Ayirezang</p>
                <p className="text-xs">Mathematics Teacher</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg ">
                <CiLogin className="w-8 h-8 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
