import React from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { addAdminStudentApi } from "../api/api";

const AddStudentModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // studentId: "",
    firstName: "",
    lastName: "",
    programme: "",
    year: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //haandle submit function
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addAdminStudentApi({
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        programme: formData.programme,
        year: formData.year,
      });
      alert("Student added successfully");
      onSuccess();
      onClose();
    } catch (error) {
      alert(
        "Failed to add student: " +
          (error.response?.data?.error || error.message),
      );
    } finally {
      setLoading(false);
    }
  };
  //call api to add student

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
          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:bg-blue-500 p-2 rounded-lg transition shrink-0 ml-4"
          >
            <RxCross1 size={18} />
          </button>
        </header>

        {/**main body */}
        <main className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/**first nmae */}
            <div className=" flex col-span-2 gap-4">
              <div className="flex-1">
                <label className={labelClass}>First Name</label>
                <input
                  className={inputClass}
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              {/**last name */}
              <div className="flex-1">
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
            <div className=" flex col-span-2 gap-4">
              <div className="flex-1">
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
              <div className="flex-1">
                <label className={labelClass}>Year</label>
                <select
                  className={inputClass}
                  value={formData.year}
                  onChange={handleChange}
                  name="year"
                >
                  <option value="">Select a year</option>
                  <option value="SHS 1">SHS 1</option>
                  <option value="SHS 2">SHS 2</option>
                  <option value="SHS  3">SHS 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className=" bg-blue-500 flex justify-center items w-full   mt-5 md:mt-6 lg:mt-8">
            <div>
              <GoPlus />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className=" hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded"
            >
              Add Student
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddStudentModal;
