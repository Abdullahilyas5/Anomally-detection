import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { accessToken, role } = useSelector((state) => state.auth);

  const token = accessToken || localStorage.getItem("accessToken");
  const storedRole = role || localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (allowedRole && storedRole !== allowedRole) {
    switch (storedRole) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "auditor":
        return <Navigate to="/auditor/dashboard" replace />;
      case "citizen":
        return <Navigate to="/citizen/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;