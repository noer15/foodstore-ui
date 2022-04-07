import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router";

const GuestOnlyRoute = ({ children, ...rest }) => {
  let navigate = useNavigate();
  let { user } = useSelector((state) => state.auth);
  return <Route {...rest}>{!user ? children : navigate("/login")}</Route>;
};
export default GuestOnlyRoute;
