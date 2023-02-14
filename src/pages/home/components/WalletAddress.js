import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { setAccounts } from "../../../redux/appsettingSlice";

const WalletAddress = (props) => {
  const { onConnected } = props;
  const dispatch = useDispatch();

  const selectedAccountId = useSelector(
    (state) => state.appsetting.selectedAccountId
  );
  const accounts = useSelector((state) => state.appsetting.accounts);
  const account = accounts.find((acc) => acc.id === selectedAccountId);

  const [address, setAddress] = useState("");

  const onAddressConnect = () => {
    if (!address) {
      toast.error("Please insert your wallet address");
      return;
    }

    const account_id = selectedAccountId;
    let newAccounts = accounts.map((acc) => {
      if (acc.id === account_id) {
        return { ...acc, status: "connecting" };
      }
      return acc;
    });

    // Mockup simulation, change the account status
    setTimeout(() => {
      newAccounts = accounts.map((acc) => {
        if (acc.id === account_id) {
          return { ...acc, status: "connected" };
        }
        return acc;
      });
      dispatch(
        setAccounts({
          accounts: newAccounts,
        })
      );
      onConnected();
      setAddress("");
    }, 10000);

    dispatch(
      setAccounts({
        accounts: newAccounts,
      })
    );
  };

  const onCopyClipboard = () => {
    toast.success("Account address was copied to clipboard");
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex items-center w-3/4">
      <img src={account?.coin?.img} alt="coin avatar" className="w-10 h-10" />
      <span className="text-2xl font-semibold whitespace-nowrap dark:text-white ml-4">
        {account?.name}
      </span>
      {account.status === "noconnect" && (
        <Fragment>
          <input
            type="text"
            placeholder={`Enter your ${account?.name} wallet address`}
            className="bg-gray-50 border border-solid border-gray-300 text-gray-900 text-sm ml-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="button"
            className="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={onAddressConnect}
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
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            Connect
          </button>
        </Fragment>
      )}
      {account.status !== "noconnect" && (
        <Fragment>
          <span className="flex items-center bg-emerald-300 text-emerald-700 text-sm px-2 py-1 ml-8 mt-1 rounded">
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
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>

            {address.substring(0, 6) +
              "..." +
              address.substring(address.length - 4, address.length)}
          </span>
          <div
            className="bg-white mt-1 ml-2 border border-solid border-gray-300 rounded cursor-pointer"
            style={{ padding: 6 }}
            id="address-copy-clipboard"
            onClick={onCopyClipboard}
          >
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
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </div>
          <div
            className="bg-white mt-1 ml-2 border border-solid border-gray-300 rounded cursor-pointer"
            style={{ padding: 6 }}
            id="sync-wallet"
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
          <Tooltip
            anchorId="address-copy-clipboard"
            place="bottom"
            content="Copy address to clipboard"
          />
          <Tooltip
            anchorId="sync-wallet"
            place="bottom"
            content="Synchronize wallet"
          />
        </Fragment>
      )}
      {account.status === "connecting" && (
        <div
          className="flex items-center bg-white py-1 px-2 mt-1 ml-2 border border-solid border-gray-300 rounded cursor-pointer text-sm"
          id="address-copy-clipboard"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          Importing Your Transactions...
        </div>
      )}
    </div>
  );
};

export default WalletAddress;
