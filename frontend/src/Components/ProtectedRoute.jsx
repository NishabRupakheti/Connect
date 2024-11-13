import React from "react";
import { useAuth } from "../context/Context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;
