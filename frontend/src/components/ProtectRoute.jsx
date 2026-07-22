import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectRoute = ({ children, allowedRole }) => {
  const user = AuthContext((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedRole && !allowedRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectRoute;
