import React, { Fragment, useEffect, useState } from "react";
import { MOCKUP_ASSETTYPES } from "../services/mockus";

const AssetItem = (props) => {
  const { item, onClose } = props;
  const [assetTypes, setAssetTypes] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [myAsset, setMyAsset] = useState(true);
  const [isPrice, setIsPrice] = useState(false);
  const [historicalPrice, setHistoricalPrice] = useState(0);
  const [historicalValue, setHistoricalValue] = useState(0);

  useEffect(() => {
    setAssetTypes(MOCKUP_ASSETTYPES);
    setTypeId(item.type_id);
    setAmount(item.amount);
    setHistoricalPrice(item.historical_price);
    setHistoricalValue(item.historical_value);
  }, []);

  return (
    <Fragment>
      <span
        className="text-red-600 text-sm flex flex-row-reverse items-center"
        onClick={() => onClose(item.id)}
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
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <div>
        <div className="flex justify-between items-center">
          <label className="block mb-1 text-xs font-medium text-gray-600 dark:text-white">
            Asset
          </label>
          <div className="flex items-center">
            <input
              checked={myAsset}
              onChange={() => setMyAsset(!myAsset)}
              type="checkbox"
              className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-300"
            >
              Only my assets
            </label>
          </div>
        </div>
        <select
          className="block p-2 w-full text-xs text-gray-900 border border-solid border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="0" hidden>
            Selete asset...
          </option>
          {assetTypes.map((assetType) => (
            <option value={assetType.id} key={assetType.id}>
              {assetType.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <label className="block mb-1 text-xs font-medium text-gray-600 dark:text-white">
          Amount
        </label>
        <input
          className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Equals $28.73</span>
          {!isPrice && (
            <span
              className="text-sm text-blue-500 cursor-pointer"
              onClick={() => setIsPrice(true)}
            >
              Set Price
            </span>
          )}
        </div>
      </div>
      {isPrice && (
        <div className="flex justify-between mt-2">
          <div>
            <span className="text-xs text-gray-500">Historical Price</span>
            <input
              className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-blue-500"
              value={historicalPrice}
              onChange={(e) => setHistoricalPrice(e.target.value)}
            />
            <span className="text-xs text-gray-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              Price of the coin
            </span>
          </div>
          <div className="ml-2">
            <span className="text-xs text-gray-500">Historical Value</span>
            <input
              className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-blue-500"
              value={historicalValue}
              onChange={(e) => setHistoricalValue(e.target.value)}
            />
            <span className="text-xs text-gray-400 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              Value of the transaction
            </span>
          </div>
          <div
            className="ml-2 text-red-600 mt-8"
            onClick={() => setIsPrice(false)}
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AssetItem;
