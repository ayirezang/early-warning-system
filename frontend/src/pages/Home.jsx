import React from "react";
import { LuBrain } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { FiShield, FiEdit3, FiActivity, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const steps = [
    {
      number: "01",
      icon: <FiEdit3 className="w-5 h-5 text-white" />,
      title: "Enter Scores",
      description:
        "Teachers log in and record student SBA (School-Based Assessment) and end-of-semester examination scores in a simple, clean form.",
    },
    {
      number: "02",
      icon: <LuBrain className="w-5 h-5 text-white" />,
      title: "AI Analyzes Risk",
      description:
        'Our AI-powered engine analyzes each student\'s performance and classifies them as "On Track" or "At Risk" with clear reasoning.',
    },
    {
      number: "03",
      icon: <FiActivity className="w-5 h-5 text-white" />,
      title: "Intervene Early",
      description:
        "Teachers and admins receive AI-generated intervention recommendations and suggested quiz topics so no student is left behind.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5 bg-white border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
            <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
            Early Warning System
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          {/* <Link to="/login">
            <button className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </button>
          </Link> */}
          <Link to="/sign-up">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </header>
      <hr className="bg-gray-50"></hr>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
          <LuBrain className="w-4 h-4 text-blue-600" />
          <p className="text-sm font-medium text-blue-700">
            AI-Powered Academic Risk Detection
          </p>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
          Catch students before they
        </h1>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-600 leading-tight mb-6">
          fall behind
        </h1>

        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mb-8">
          Early Warning System uses AI to analyze student scores and flag
          at-risk learners early — so teachers and administrators can intervene
          while it still matters.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/login">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Open Dashboard <FaArrowRight size={14} />
            </button>
          </Link>
          <button className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors">
            How It Works
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <p className="text-blue-600 font-bold text-sm mb-1">
                {step.number}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for schools */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center bg-white border-y border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          Built for schools that care
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Simple tools to identify, track, and support every at-risk student.
        </p>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        <div className="bg-blue-900 rounded-2xl shadow-sm px-6 sm:px-12 py-12 sm:py-16 text-center">
          <p className="text-white text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to protect your students?
          </p>
          <p className="text-blue-200 max-w-xl mx-auto mb-8">
            Open the dashboard and start entering scores. The AI will do the
            rest — flagging at-risk students so you can intervene early.
          </p>
          <Link to="/login">
            <button className="bg-white text-blue-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors">
              Open Dashboard <FaArrowRight size={14} />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <FiShield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Early Warning System
            </span>
          </div>
          <p className="text-xs text-gray-400 text-center">
            © 2026 Early Warning System. Intervene before it's too late.
          </p>
          <Link
            to="/login"
            className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// import React from "react";
// import { LuBrain } from "react-icons/lu";
// import { FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { FiShield } from "react-icons/fi";

// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
//       {/**header */}
//       <div>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <Link to="/">
//             <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
//               <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//             </div>
//           </Link>
//           <div>
//             <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
//               Early Warning System
//             </h1>
//           </div>
//         </div>
//         <Link to="/sign-up">
//           <button className="bg-violet-200 px-4 py-4 rounded-md">
//             Get Started
//           </button>
//         </Link>
//         <hr className="my-4 border-gray-300" />
//       </div>
//       {/**content */}
//       <div className=" flex justify-content px-10 py-6 bg-blue-100 rounded-xl shadow-sm cursor-pointer">
//         <LuBrain size={10} />
//         <p>Ai powered Academic Risk Detection</p>
//       </div>
//       <h1 className="text-2xl font-bold text-blue-900 leading-tight">
//         Catch Students Before they fall behind
//       </h1>
//       <p>
//         Early Warning uses Ai to analyse student scores and flag at-risk
//         learners early so teachers can intervene while it still matters{" "}
//       </p>
//       {/**buttons */}
//       <div className="flex gap-2">
//         <button className="bg-violet-300 text-white cursor-pointer hover:bg-violet-400">
//           open to dashboard
//         </button>
//         <button className="bg-white px-6 py-4 hover:cursor-pointer">
//           how it works
//         </button>
//       </div>
//       <p>Built for schools that care about their students' success</p>
//       <div className="flex  flex-col gap-2 bg-blue-600 px-10 py-6 rounded-xl shadow-sm cursor-pointer   ">
//         <p className="text-white font-bold">Ready to protect your students?</p>
//         <p>
//           Open DashBoard and start entering scores.This AI will do the rest.
//         </p>
//         <button className="bg-white text-blue-600 px-6 py-4 hover:bg-gray-100 flex items-center gap-2">
//           Open Dashboard <FaArrowRight />
//         </button>
//       </div>
//       {/**footer */}
//       <div className="flex justify-evenly">
//         <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg">
//           <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//         </div>

//         <div>
//           <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
//             Early Warning System
//           </h1>
//           {/** */}
//           <div>
//             <p>@2026 Early Warning System. All rights reserved.</p>
//           </div>
//           {/** */}
//           <div>
//             <p className="text-xs text-gray-200 cursor-pointer">Dashboard</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
