import React from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router-dom";

import { useNavigate } from "react-router";

const GuardRoute = ({ children, ...rest }) => {
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  return <Routes {...rest}>{user ? children : navigate("/login")}</Routes>;
};
export default GuardRoute;
