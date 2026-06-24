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
        </div>
        </div>
      </main>
    </div>
  );
};

export default AddStudentModal;
