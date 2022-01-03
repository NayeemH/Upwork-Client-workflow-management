import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth === true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateOutlet;
