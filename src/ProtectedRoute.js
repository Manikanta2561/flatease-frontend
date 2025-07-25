import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;