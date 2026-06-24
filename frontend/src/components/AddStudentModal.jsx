import React from "react";

const AddStudentModal = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-end sm:items-center justify-center z-50">
      <header className="bg-blue-600 flex justify-between items-start p-4 sm:p-5 text-white shrink-0">
        Add Student
        <hr className="bg-gray-600"></hr>
      </header>

      {/**main body */}
      <main className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/**student id */}
          <div>
            <label>Student Id</label>
            <input className="w-full "></input>
          </div>
          {/**first nmae */}
          <div className="flex gap-2">
            <div>
              <label>first name</label>
              <input className="w-full"></input>
            </div>
            {/**last name */}
            <div>
              <label>Last Name</label>
              <input className="w-full"></input>
            </div>
          </div>
          {/**year */}
          <div>
            <label>Year</label>
            <select className="w-full">
              <option value="">Select a year</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
            </select>
          </div>
          {/**programme */}
          <div>
            <label>Programme</label>
            <select className="w-full">
              <option value="">Select a programme</option>
              <option value="Visual Arts">Visual Arts</option>
              <option value="Business">Business</option>
              <option value="Science"> General Science</option>
              <option value="Home Economics">Home Economics</option>
            </select>
          </div>
          {/**class */}
          <div>
            <label>Class</label>
            <input className="w-full" placeholder="E.g.1A"></input>
          </div>
          {/**submit button  and cancel button */}
          <div className="flex justify-end gap-2">
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudentModal;
