import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const account = useSelector((state) => state.appsetting.account);
  const accountCoins = account?.coins || [];

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-5/6 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col">
        <ul className="space-y-2">
          <li>
            <span className="flex items-center p-2 text-lg font-medium text-gray-900 rounded-lg dark:text-white">
              <span className="ml-3">Your Accounts</span>
            </span>
          </li>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          {accountCoins.map((coin) => (
            <li key={coin.id}>
              <span className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={coin.img} alt="coin avatar" className="w-8 h-8" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {coin.name}
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  ...
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="w-full text-blue-700 hover:text-white border border-solid border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mx-4 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          + Create Account
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
