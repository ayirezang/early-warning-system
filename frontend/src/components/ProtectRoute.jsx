import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectRoute = ({ children, allowedRole }) => {
  const role = useAuthStore((state) => state.role);
  if (!role) {
    return <Navigate to="/login" />;
  }
  if (allowedRole && !allowedRole.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectRoute;
