import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AccountDropdown from "./AccountDropdown";
import { setSelectedAccountId, setAccounts } from "../redux/appsettingSlice";
import AccountCoins from "./AccountCoins";
import { MOCKUP_COINS } from "../services/mockus";

const Navbar = () => {
  const account = useSelector((state) => state.appsetting.account);
  let accounts = useSelector((state) => state.appsetting.accounts);

  const selectedAccountId = useSelector(
    (state) => state.appsetting.selectedAccountId
  );

  const dispatch = useDispatch();

  const [openEditAccountModal, setOpenEditAccountModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");

  const arrange = (accountList) => {
    let rst = [];
    const result = accountList.map((acc) => acc.coin.id);
    const uniqueIds = [...new Set(result)];
    for (let uniqueId of uniqueIds) {
      const accountsWithCoin = accountList.filter(
        (acc) => acc.coin.id === uniqueId
      );
      rst = [...rst, ...accountsWithCoin];
    }
    return rst;
  };

  accounts = arrange(accounts);

  const onAccountClick = (accountId) => {
    dispatch(
      setSelectedAccountId({
        selectedAccountId: accountId,
      })
    );
  };

  const onEditClick = (account) => {
    setOpenEditAccountModal(true);
    setAccountId(account.id);
    setAccountName(account.name);
  };

  const onDeleteClick = (account) => {
    setOpenDeleteAccountModal(true);
    setAccountId(account.id);
  };

  const onAddClick = () => {
    setOpenCreateAccountModal(true);
  };

  // when clicking the save button on Edit Account modal
  const onCreateClick = (coinId) => {
    const coin = MOCKUP_COINS.find((item) => item.id === coinId);
    const userAccounts = accounts.filter((acc) => {
      const nameOriginal = acc.name.split("(")[0];
      if (acc.coin.id === coinId && nameOriginal === coin.name) return true;
      return false;
    });
    const newAccountNameSuffix =
      userAccounts.length !== 0 ? `(${userAccounts.length})` : "";
    const newAccountName = coin.name + newAccountNameSuffix;
    const newAccountId = accounts.length + 1;
    const newAccount = {
      id: newAccountId,
      name: newAccountName,
      coin: coin,
      status: "noconnect",
    };
    dispatch(
      setAccounts({
        accounts: [...accounts, newAccount],
      })
    );
    setOpenCreateAccountModal(false);
  };

  // when clicking the save button on Edit Account modal
  const onSaveClick = () => {
    const newAccounts = accounts.map((acc) => {
      if (acc.id === accountId) {
        return { ...acc, name: accountName };
      }
      return acc;
    });
    dispatch(
      setAccounts({
        accounts: newAccounts,
      })
    );
    setOpenEditAccountModal(false);
  };

  // when clicking the delete button on Delete Account modal
  const onRemoveClick = () => {
    const newAccounts = accounts.filter((acc) => acc.id !== accountId);
    dispatch(
      setAccounts({
        accounts: newAccounts,
      })
    );

    if (selectedAccountId === accountId) {
      dispatch(
        setSelectedAccountId({
          selectedAccountId: newAccounts[0]?.id || null,
        })
      );
    }

    setOpenDeleteAccountModal(false);
  };

  return (
    <Fragment>
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
            {accounts.map((account) => (
              <li key={account.id} onClick={() => onAccountClick(account.id)}>
                <div className="relative cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <img
                    src={account.coin.img}
                    alt="coin avatar"
                    className="w-8 h-8"
                  />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {account.name}
                  </span>
                  <AccountDropdown
                    onEdit={() => onEditClick(account)}
                    onDelete={() => onDeleteClick(account)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onAddClick}
            className="w-full text-blue-700 hover:text-white border border-solid border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mx-4 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            + Create Account
          </button>
        </div>
      </aside>
      <Modal
        open={openEditAccountModal}
        onClose={() => setOpenEditAccountModal(false)}
        classNames={{
          modal: "reactModal",
        }}
        center
      >
        <div className="py-4 px-2">
          <span className="font-medium">Rename Account</span>
          <div className="mt-8">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">
              Account name
            </label>
            <input
              className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div className="mt-6 flex items-center justify-end">
            <button
              onClick={() => setOpenEditAccountModal(false)}
              className="text-gray-900 bg-white border border-solid border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Cancel
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={onSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openDeleteAccountModal}
        onClose={() => setOpenDeleteAccountModal(false)}
        classNames={{
          modal: "reactModal",
        }}
        center
      >
        <div className="py-4 px-2">
          <span className="font-medium">Delete Account</span>
          <div className="mt-8">
            <p className="text-center text-gray-600">
              Are you sure you want to delete this account and all its
              transaction data?
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => setOpenDeleteAccountModal(false)}
              className="text-gray-900 bg-white border border-solid border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Cancel
            </button>
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={onRemoveClick}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openCreateAccountModal}
        onClose={() => setOpenCreateAccountModal(false)}
        classNames={{
          modal: "fullModal",
        }}
        center
      >
        <div className="py-4 px-2">
          <span className="font-medium">Create Account</span>
          <div className="mt-4">
            <AccountCoins
              onSelected={(coinId) => onCreateClick(coinId)}
              coinList={MOCKUP_COINS}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Navbar;
