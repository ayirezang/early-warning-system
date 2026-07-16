import StatCard from "../components/StatCard";
import Header from "../components/Header";
import AdminStudentable from "../components/AdminStudentable";
import Buttons from "../components/Buttons";
import AddStudentModal from "../components/AddStudentModal";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <StatCard label="Total Students" value={24} />
          <StatCard label="Total teachers" value={10} />
          <StatCard label="AT-risk students" value={8} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Buttons
            icon={<GoPlus size={24} />}
            label="Enter new score"
            color="blue"
            onClick={() => setIsOpen(true)}
          />
        </div>
        {isOpen && (
          <AddStudentModal
            onClose={() => setIsOpen(false)}
            onSuccess={() => setRefresh((prev) => prev + 1)}
          />
        )}

        <div>
          <AdminStudentable refresh={refresh} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
