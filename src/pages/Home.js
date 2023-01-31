import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const account = useSelector((state) => state.appsetting.account);

  let navigate = useNavigate();

  useEffect(() => {
    if (!account?.is_set) {
      navigate("/individual/onboarding");
    }
  }, []);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default Home;
