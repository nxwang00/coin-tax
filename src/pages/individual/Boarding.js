import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStepper from "./components/ProgressStepper";
import Welcome from "./components/Welcome";
import CountryCurrency from "./components/Country";
import Accounts from "./components/Accounts";
import ConfirmEmail from "./components/ConfirmEmail";
import Finish from "./components/Finish";

const Boarding = () => {
  let navigate = useNavigate();

  const [position, setPosition] = useState(1);

  const onWelcomeNextClicked = () => {
    setPosition(position + 1);
  };

  const onCountryNextClicked = () => {
    setPosition(position + 1);
  };

  const onAccountsNextClicked = () => {
    setPosition(position + 1);
  };

  const onConfirmEmailNextClicked = () => {
    setPosition(position + 1);
  };

  const onFinishNextClicked = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="py-16 grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
          <ProgressStepper position={position} />
        </div>
      </div>
      {position === 1 && (
        <div className="flex justify-center px-10 mt-20">
          <Welcome onClicked={onWelcomeNextClicked} />
        </div>
      )}
      {position === 2 && (
        <div className="flex justify-center px-10 mt-10">
          <CountryCurrency onClicked={onCountryNextClicked} />
        </div>
      )}
      {position === 3 && (
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4">
            <Accounts onClicked={onAccountsNextClicked} />
          </div>
        </div>
      )}
      {position === 4 && (
        <div className="flex justify-center px-10 mt-4">
          <ConfirmEmail onClicked={onConfirmEmailNextClicked} />
        </div>
      )}
      {position === 5 && (
        <div className="flex justify-center px-10 mt-4">
          <Finish onClicked={onFinishNextClicked} />
        </div>
      )}
    </div>
  );
};

export default Boarding;
