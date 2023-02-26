import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WalletAddress from "./components/WalletAddress";
import Transactions from "./components/Transactions";
import Navbar from "../../components/Navbar";

const Home = () => {
  const selectedAccountId = useSelector(
    (state) => state.appsetting.selectedAccountId
  );
  const [accountConnected, setAccountConnected] = useState(false);

  return (
    <Fragment>
      <Navbar />
      <div className="ml-60 mt-28">
        {selectedAccountId && (
          <Fragment>
            <div className="flex items-center justify-between">
              <WalletAddress onConnected={() => setAccountConnected(true)} />
              <button
                type="button"
                className="inline-flex items-center text-center text-blue-700 hover:text-white border border-solid border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Import History
              </button>
            </div>
            <Transactions connected={accountConnected} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
