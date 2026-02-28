import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check authentication state from Redux
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Optionally check localStorage token as backup
//   const token = localStorage.getItem("token");

//   if (!isAuthenticated && !token) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/login" replace />;
//   }

  return children;
};

export default ProtectedRoute;