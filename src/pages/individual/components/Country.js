import React, { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../../redux/appsettingSlice";

const CountryCurrency = (props) => {
  const { onClicked } = props;
  const dispatch = useDispatch();

  const account = useSelector((state) => state.appsetting.account);
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");

  const onBtnClicked = () => {
    const accountData = { ...account, country, currency };
    dispatch(
      setAccount({
        account: accountData,
      })
    );
    onClicked();
  };

  return (
    <div className="w-1/3">
      <h2 className="text-3xl mt-6">Select your country & currency</h2>
      <p className="text-gray-500 mt-4">
        We use this to determine the tax rules for your report and to calculate
        your gains and losses.
      </p>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Country
        </label>
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Currency
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option hidden value="">
            Select Currency
          </option>
          <option value="USD">USD (United States)</option>
          <option value="GBP">GBP (United Kingdom)</option>
          <option value="CNY">CNY (China)</option>
          <option value="AUD">AUD (Australia)</option>
          <option value="INR">INR (India)</option>
        </select>
      </div>
      <button
        type="button"
        className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onBtnClicked}
        disabled={!country || !currency}
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

export default CountryCurrency;
