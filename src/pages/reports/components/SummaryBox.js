import React from "react";
import { Link } from "react-router-dom";

const SummaryBox = (props) => {
  const { data, caption } = props;

  const formatAmountStr = (amountStr) => {
    let newStr = "";

    for (let i = 0; i < amountStr.length; i++) {
      if (i === 0 || amountStr[i] === ".") {
        newStr += amountStr[i];
      } else {
        newStr += "*";
      }
    }
    return newStr;
  };

  return (
    <div className="border border-solid border-gray-200 rounded p-3 mt-4">
      <span className="font-medium">{caption}</span>
      <hr className="h-px mt-3 mb-2 bg-gray-200" />
      <div className="relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {data &&
              data.map((item, idx) => {
                const formatAmount = item.amount
                  ? formatAmountStr(item.amount)
                  : "";
                return (
                  <tr className="bg-white dark:bg-gray-800" key={idx}>
                    <td className="py-2 flex items-center">
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </td>
                    {item.amount && (
                      <td className="py-2 text-right">${formatAmount}</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className="absolute"
          style={{
            left: "37%",
            top: caption === "Taxable Income" ? "35%" : "15%",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="p-2 bg-gray-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <Link
              className="text-xs font-medium text-blue-400 mt-2"
              to="/unlock"
            >
              Upgrade to Unlock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
