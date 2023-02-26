import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AccountDropdown from "./AccountDropdown";
import { setSelectedAccountId, setAccounts } from "../redux/appsettingSlice";
import AccountCoins from "./AccountCoins";
import {
  MOCKUP_ASSETTYPES,
  TRANSACTION_CLASSIFICATION,
} from "../services/mockus";

const Sidebar = (props) => {
  const { onChanged } = props;

  let accounts = useSelector((state) => state.appsetting.accounts);

  const [selectedSort, setSeletedSort] = useState("descending");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedAssetType, setSeletedAssetType] = useState("0");
  const [dateRangeValue, setDateRangeValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedTranTypes, setSelectedTranTypes] = useState([]);

  const onSortSelect = (e) => {
    const selected_sort = e.target.value;
    setSeletedSort(selected_sort);

    const data = {
      sort: selected_sort,
      account_ids: selectedAccounts,
      asset_type_id: selectedAssetType,
      date_range: dateRangeValue,
      tran_types: selectedTranTypes,
    };
    onChanged(data);
  };

  const onAccountClick = (accountId) => {
    const existAccount = selectedAccounts.find(
      (selected_account) => selected_account === accountId
    );

    let newAccounts = [];
    if (existAccount) {
      newAccounts = selectedAccounts.filter((sa) => sa !== accountId);
    } else {
      newAccounts = [...selectedAccounts, accountId];
    }
    setSelectedAccounts(newAccounts);

    const data = {
      sort: selectedSort,
      account_ids: newAccounts,
      asset_type_id: selectedAssetType,
      date_range: dateRangeValue,
      tran_types: selectedTranTypes,
    };
    onChanged(data);
  };

  const onAssetTypeSelect = (e) => {
    const selected_assetType = e.target.value;
    setSeletedAssetType(selected_assetType);

    const data = {
      sort: selectedSort,
      account_ids: selectedAccounts,
      asset_type_id: selected_assetType,
      date_range: dateRangeValue,
      tran_types: selectedTranTypes,
    };
    onChanged(data);
  };

  const onDateRangeChange = (val) => {
    setDateRangeValue(val);
    const data = {
      sort: selectedSort,
      account_ids: selectedAccounts,
      asset_type_id: selectedAssetType,
      date_range: val,
      tran_types: selectedTranTypes,
    };
    onChanged(data);
  };

  const onTranTypeClick = (tranType) => {
    const existTranType = selectedTranTypes.find(
      (selected_trantype) => selected_trantype === tranType
    );

    let newTranTypes = [];
    if (existTranType) {
      newTranTypes = selectedTranTypes.filter((stt) => stt !== tranType);
    } else {
      newTranTypes = [...selectedTranTypes, tranType];
    }
    setSelectedTranTypes(newTranTypes);

    const data = {
      sort: selectedSort,
      account_ids: selectedAccounts,
      asset_type_id: selectedAssetType,
      date_range: dateRangeValue,
      tran_types: newTranTypes,
    };
    onChanged(data);
  };

  return (
    <Fragment>
      <aside
        id="logo-sidebar"
        className="fixed top-0 right-0 z-40 w-96 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="px-3 pb-2 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col">
          <ul className="space-y-2">
            <li>
              <span className="flex items-center p-2 text-lg font-medium text-gray-900 rounded-lg dark:text-white">
                <span className="ml-3">Filters</span>
              </span>
            </li>
            <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>
            <div className="py-3 px-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sort by
              </label>
              <select
                className="block w-full p-2 text-xs text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedSort}
                onChange={onSortSelect}
              >
                <option value="descending">Descending</option>
                <option value="ascending">Ascending</option>
              </select>
            </div>
            <hr className="h-px my-8 mx-2 bg-gray-100 border-0 dark:bg-gray-700"></hr>
            <div className="py-3 px-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Accounts
              </label>
              <p className="text-ellipsis leading-7">
                {accounts.map((acc) =>
                  selectedAccounts.includes(acc.id) ? (
                    <span
                      key={acc.id}
                      className="mr-2 text-xs py-1 px-2 bg-blue-200 text-blue-700 rounded-sm cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span onClick={() => onAccountClick(acc.id)}>
                        {acc.name}
                      </span>
                    </span>
                  ) : (
                    <span
                      key={acc.id}
                      className="mr-2 text-xs py-1 px-2 bg-gray-200 rounded-sm cursor-pointer"
                      onClick={() => onAccountClick(acc.id)}
                    >
                      {acc.name}
                    </span>
                  )
                )}
              </p>
            </div>
            <hr className="h-px my-8 mx-2 bg-gray-100 border-0 dark:bg-gray-700"></hr>
            <div className="py-3 px-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Assets
              </label>
              <select
                className="block w-full p-2 text-xs text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={selectedAssetType}
                onChange={onAssetTypeSelect}
              >
                <option value="0">All</option>
                {MOCKUP_ASSETTYPES.map((asset_type) => (
                  <option value={asset_type.id} key={asset_type.id}>
                    {asset_type.name}
                  </option>
                ))}
              </select>
            </div>
            <hr className="h-px my-8 mx-2 bg-gray-100 border-0 dark:bg-gray-700"></hr>
            <div className="py-3 px-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Range
              </label>
              <Datepicker
                value={dateRangeValue}
                onChange={onDateRangeChange}
                useRange={false}
                placeholder="Select date range..."
                inputClassName="review-date-range w-full text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-1 focus:outline-none"
                containerClassName=""
              />
            </div>
            <hr className="h-px my-8 mx-2 bg-gray-100 border-0 dark:bg-gray-700"></hr>
            <div className="py-3 px-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Transaction Type
              </label>
              <p className="text-ellipsis leading-7">
                {TRANSACTION_CLASSIFICATION.map((tranType) =>
                  selectedTranTypes.includes(tranType.name) ? (
                    <span
                      key={tranType.id}
                      className="mr-2 text-xs py-1 px-2 bg-blue-200 text-blue-700 rounded-sm cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 inline"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span
                        key={tranType.name}
                        onClick={() => onTranTypeClick(tranType.name)}
                      >
                        {tranType.name}
                      </span>
                    </span>
                  ) : (
                    <span
                      key={tranType.id}
                      className="text-xs py-1 px-2 mb-2 mr-2 bg-gray-200 rounded-sm text-center cursor-pointer"
                      onClick={() => onTranTypeClick(tranType.name)}
                    >
                      {tranType.name}
                    </span>
                  )
                )}
              </p>
            </div>
          </ul>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
