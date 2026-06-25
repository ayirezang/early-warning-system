import React from "react";
import { useState } from "react";

const AddStudentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    programme: "",
    year: "",
    class: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //haandle submit function
  const handleSubmit = async () => {
    console.log("studentId:", formData.studentId);
    console.log("firstName:", formData.firstName);
    console.log("lastName", formData.lastName);
    console.log("programme:", formData.programme);
    console.log("year", formData.year);
    console.log("class", formData.class);
  };
  // Define CSS classes for input and label elements
  const inputClass =
    "border border-gray-300 rounded-lg w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "text-sm sm:text-md font-semibold text-gray-700";
  return (
    <div className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50">
      <div
        className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-3xl sm:mx-4 p-0 overflow-hidden shadow-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-blue-600 flex justify-between items-start p-4 sm:p-5 text-white shrink-0">
          Add Student
          <hr className="bg-gray-600"></hr>
        </header>

        {/**main body */}
        <main className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/**student id */}
            <div className="col-span-2">
              <label className={labelClass}>Student Id</label>
              <input
                className={inputClass}
                value={formData.studentId}
                onChange={handleChange}
                name="studentId"
              />
            </div>
            {/**first nmae */}
            <div className="gap-2">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  className={inputClass}
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              {/**last name */}
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  className={inputClass}
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>
            </div>

            {/**programme */}
            <div>
              <div>
                <label className={labelClass}>Programme</label>
                <select
                  className={inputClass}
                  value={formData.programme}
                  onChange={handleChange}
                  name="programme"
                >
                  <option value="">Select a programme</option>
                  <option value="Visual Arts">Visual Arts</option>
                  <option value="Business">Business</option>
                  <option value="Science"> General Science</option>
                  <option value="Home Economics">Home Economics</option>
                </select>
              </div>
              {/**year */}
              <div>
                <label className={labelClass}>Year</label>
                <select
                  className={inputClass}
                  value={formData.year}
                  onChange={handleChange}
                  name="year"
                >
                  <option value="">Select a year</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                </select>
              </div>
            </div>
            {/**class */}
            <div className="col-span-2">
              <label className={labelClass}>Class</label>
              <input
                className={inputClass}
                value={formData.class}
                onChange={handleChange}
                name="class"
                placeholder="E.g.1A"
              />
            </div>
            {/**submit button  and cancel button */}
          </div>
          <div className="flex justify-end gap-2 mt-5 md:mt-6 lg:mt-8">
            <button
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddStudentModal;
