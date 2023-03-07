import React, { Fragment, useEffect, useState } from "react";
import Accordion from "react-accordion-comp";
import "react-accordion-comp/dist/styles.css";

const MissingCost = () => {
  const [flag, setFlag] = useState(false);
  const onTitleClick = () => {
    setFlag(!flag);
  };

  return (
    <div>
      <div
        className={`flex bg-white justify-between items-center p-3 border-solid border-x border-t ${
          flag ? "" : "border-b rounded-b"
        } border-gray-300 cursor-pointer rounded-t`}
        onClick={onTitleClick}
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2 text-orange-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <span className="font-semibold">Missing Cost Basis</span>
        </span>
        <span>
          {flag ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </span>
      </div>
      <Accordion isOpen={flag}>
        <div
          className={`bg-white border-solid border-x border-b border-gray-300 px-3 pb-2 overflow-y-auto h-24 rounded-b`}
        >
          It looks like you have transactions that are missing cost basis and
          are inflating your net capital gains. For these transactions,
          CoinLedger assumes a cost basis of $0 for tax reporting purposes. You
          can reduce your gains by fixing the missing basis, or you can ignore
          and submit your tax reports with the $0 cost basis (this is allowed by
          tax authorities). View the troubleshooting page for more information.
        </div>
      </Accordion>
    </div>
  );
};

export default MissingCost;
