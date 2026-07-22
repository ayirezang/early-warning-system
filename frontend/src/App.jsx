import React from "react";
import Login from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectRoute from "./components/ProtectRoute";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoute allowedRole={["user"]}>
              {" "}
              <Dashboard />{" "}
            </ProtectRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <ProtectRoute allowedRole={["admin"]}>
              <AdminDashboard />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
