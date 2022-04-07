import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Responsive, ButtonCircle } from "upkit";
import StoreLogo from "../StoreLogo";
import FaUserCircle from "@meronex/icons/fa/FaUserCircle";
export default function TopBar() {
  let auth = useSelector((state) => state.auth);
  return (
    <div>
      <Responsive desktop={2} className="flex justify-between">
        <div>
          <StoreLogo />
        </div>
        <div className="mr-5 text-right">
          <Link to={auth?.user ? "/account" : "/login"}>
            <div className="mr-2 inline-block text-red-600 font-bold">
              {auth?.user?.full_name}
            </div>
            <ButtonCircle icon={<FaUserCircle />} />
          </Link>
        </div>
      </Responsive>
    </div>
  );
}
