import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const account = useSelector((state) => state.appsetting.account);

  let navigate = useNavigate();

  useEffect(() => {
    if (!account?.is_set) {
      navigate("/individual/onboarding");
    }
  }, []);

  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="mx-12 mt-20">{children}</div>
    </div>
  );
};

export default Layout;
