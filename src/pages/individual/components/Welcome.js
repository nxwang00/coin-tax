import React, { useEffect, useState } from "react";

const Welcome = (props) => {
  const { onClicked } = props;

  return (
    <div>
      <p className="text-blue-700">Account Setup</p>
      <h2 className="text-4xl mt-6">Welcome to Coin Tax Report</h2>
      <p className="text-gray-500 mt-4">
        We understand that crypto tax reporting can be difficult. <br /> We’re
        here to change that.
      </p>
      <button
        type="button"
        className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onClicked}
      >
        Continue
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
  );
};

export default Welcome;
