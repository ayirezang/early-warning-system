import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { firstName, lastName, subject } = useContext(AuthContext);

  return (
    <header className="border-b border-gray-200 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/">
              <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
                <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </Link>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
                Early Warning System
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Student Performance Monitoring
              </p>
            </div>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-right">
              <p className="text-gray-900 font-bold text-sm sm:text-xl leading-tight">
                {firstName} {lastName}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                {subject} Teacher
              </p>
            </div>
            <Link to="/">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <CiLogin className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { FiShield } from "react-icons/fi";
// import { CiLogin } from "react-icons/ci";

// import { AuthContext } from "../context/AuthContext";

// const Header = () => {
//   const { firstName, lastName, subject } = useContext(AuthContext);
//   return (
//     <div>
//       <header
//         className=" border-b border-gray-200 shadow-md
//       "
//       >
//         <div className=" w-full   px-4  sm:px-6 lg:px-8">
//           <div className="flex  justify-between h-16">
//             <div className="flex items-center gap-3 ">
//               <Link to="/">
//                 <div className="bg-blue-600 p-2 rounded-lg">
//                   <FiShield className="w-8 h-8 text-white" />
//                 </div>
//               </Link>
//               {/**erly warning  */}
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">
//                   Early warning system
//                 </h1>
//                 <p className="text-xs text-gray-500">
//                   Student Performance monitoring{" "}
//                 </p>
//               </div>
//             </div>
//             {/**name and subject */}
//             <div className="flex items-center gap-4">
//               <div className="">
//                 <p className=" text-gray-900 font-bold text-xl">
//                   {firstName} {lastName}
//                 </p>

//                 <p className="text-sm text-gray-500">{subject} Teacher</p>
//               </div>
//               <Link to="/">
//                 <button className="p-2 hover:bg-gray-100 rounded-lg ">
//                   <CiLogin className="w-6 h-6 " />
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
