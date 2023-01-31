import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmailImg from "../../../assets/imgs/email.svg";

const ConfirmEmail = (props) => {
  const { onClicked } = props;

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <img src={EmailImg} className="mx-auto" alt="accout setup email" />
      <p className="text-blue-700 text-center">Onboarding Email Confirmation</p>
      <p className="text-4xl mt-6 text-center">Please check your inbox</p>
      <p className="text-gray-500 mt-4 text-lg text-center">
        Almost there! We sent an email to{" "}
        <span className="font-bold">{user.email}</span>. <br />
        Click on the link inside to verify your email address.
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="mx-auto mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClicked}
        >
          Skip now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </div>
      <p className="text-gray-500 mt-20 text-lg text-center">
        Haven’t received your email yet? Check your spam folder or{" "}
        <span className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
          resend email now.
        </span>
      </p>
    </div>
  );
};

export default ConfirmEmail;
