import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTERS } from "../constant/Constant";

const PrivetRoute = () => {
  const Token = localStorage.getItem("Token");
  if (Token) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTERS.SIGN_IN} />;
  }
};

export default PrivetRoute;
