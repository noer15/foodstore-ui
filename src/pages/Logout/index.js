import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LayoutOne } from "upkit";
import { userLogout } from "../../features/Auth/actions";
import BounceLoader from "react-spinners/BounceLoader";
import { logoutUser } from "../../api/auth";

export default function Logout() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    logoutUser()
      .then(() => {
        dispatch(userLogout());
      })
      .then(() => {
        navigate("/");
      });
  }, []);
  return (
    <div>
      <LayoutOne size="small">
        <div className="text-center flex flex-col justify-center items-center">
          <BounceLoader color="red" />
          <br />
          Logging out ...
        </div>
      </LayoutOne>
    </div>
  );
}
