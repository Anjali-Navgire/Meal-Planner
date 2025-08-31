import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children; // this renders the <Home /> or whatever child component is passed
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;