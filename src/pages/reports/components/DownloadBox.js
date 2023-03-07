import React from "react";
import { useNavigate, Link } from "react-router-dom";

const DownloadBox = () => {
  const navigate = useNavigate();

  const onUnlock = () => {
    navigate("/unlock");
  };

  return (
    <div className="px-6 py-4 mt-4 bg-white border border-solid border-gray-300 rounded">
      <span className="text-xs text-gray-600 font-medium">
        TAX REPORT DOWNLOADS
      </span>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-4">
        <li className="py-2">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={onUnlock}
          >
            <div className="flex-shrink-0 bg-blue-200 text-blue-600 p-1.5 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                IRS Forms
              </p>
            </div>
          </div>
        </li>
        <hr className="h-px my-3 bg-gray-200" />
        <li className="py-2">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={onUnlock}
          >
            <div className="flex-shrink-0 bg-green-200 text-green-600 p-1.5 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Tax Filling Software
              </p>
            </div>
          </div>
        </li>
        <hr className="h-px my-3 bg-gray-200" />
        <li className="py-2">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={onUnlock}
          >
            <div className="flex-shrink-0 bg-red-200 text-red-600 p-1.5 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                CSV Reports
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DownloadBox;
