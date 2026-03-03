import React from "react";
import { RxCross1 } from "react-icons/rx";

const ScoreModal = ({ onClose }) => {
  const students = [
    {
      id: "S-001",
      name: "Patience Ayirezang",
    },
    {
      id: "S-002",
      name: "Patience Ayirezang",
    },
    {
      id: "S-001",
      name: "Patience Ayirezang",
    },
    {
      id: "S-001",
      name: "Patience Ayirezang",
    },
    {
      id: "S-001",
      name: "Patience Ayirezang",
    },
    {
      id: "S-001",
      name: "Patience Ayirezang",
    },
  ];
  const academicYear = ["Year 1", "Year 2", "Year 3"];
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-4xl mx-4 p-0 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-blue-800 flex justify-between p-5 text-white rounded-xl">
          <div>
            <h1 className="font-bold text-2xl ">Enter Student Score</h1>
            <p className="text-blue-100 text-sm mt-1">
              Add new assessment scores and get AI-powered risk prediction
            </p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:bg-blue-500 px-2 py-1 rounded-lg transition"
          >
            <RxCross1 size={20} />
          </button>
        </header>
        <main className="mt-8 bg-white px-6 pb-6">
          <form>
            {/**name and academic year */}
            <div className="grid grid-cols-2 gap-4">
              {/**name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 ">
                  Student Name *
                </label>
                <select className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2">
                  <option value="">Select a student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              {/**academic */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Academic Year *
                </label>
                <select className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2">
                  <option value="">Select year...</option>
                  {academicYear.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/**semester and sba score */}
            {/**semester */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 ">
                  Semester *
                </label>
                <select className="border border-gray-300  rounded-lg w-full  px-4 py-3 focus:outline-none focus:ring-2">
                  <option value="">Select semester...</option>
                  <option value="">Semester 1</option>
                  <option value="">Semester 2</option>
                </select>
              </div>

              {/**sba score */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 ">
                  SBA Score (0-100) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter SBA score"
                  className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
            </div>
            {/**exam score */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-md  text-gray-700 font-semibold mt-2 ">
                  Exam Score(0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter SBA score"
                  className="border border-gray-300 rounded-lg  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
              {/**attendance */}
              <div className="flex flex-col gap-2">
                <label className="text-md  text-gray-700 font-semibold mt-2 ">
                  Attendance(0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Enter attendance"
                  className="border border-gray-300 rounded-lg  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></input>
              </div>
            </div>
            {/** buttons*/}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className=" flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer">
                Cancel
              </button>
              <button className=" flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98">
                Get Prediction
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ScoreModal;
