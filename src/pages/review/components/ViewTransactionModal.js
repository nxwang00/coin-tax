import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Tooltip } from "react-tooltip";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";
import {
  MOCKUP_REVIEW_TRANSACTION_DETAIL,
  MOCKUP_ASSETTYPES,
} from "../../../services/mockus";
import { Fragment } from "react";

const ViewTransactionModal = (props) => {
  const { isOpen, transaction, onCancel, onMissingCost } = props;

  const [dateTime, setDateTime] = useState(new Date());
  const [detail, setDetail] = useState({});
  const [assets, setAssests] = useState([]);

  useEffect(() => {
    if (transaction) {
      setDateTime(parseISO(transaction.date));
      const reviewDetail = MOCKUP_REVIEW_TRANSACTION_DETAIL.find(
        (td) => td.transaction_id === transaction.id
      );
      setDetail(reviewDetail);

      const receivedAssets = reviewDetail.received || [];
      const sentAssets = reviewDetail.sent || [];
      setAssests([...receivedAssets, ...sentAssets]);
    }
  }, [transaction]);

  const onCopyClipboard = (tranId) => {
    toast.success("Transaction Id was copied to clipboard");
    navigator.clipboard.writeText(tranId);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      classNames={{
        modal: "middleModal",
      }}
      center
    >
      <div className="py-4 px-2">
        <span className="font-medium">View Transaction</span>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span>{format(dateTime, "MMM dd, yyyy hh:mm a")}</span>
            <span className="flex items-center">
              {transaction?.type === "Withdrawal" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
              )}
              {transaction?.type}
            </span>
            <div className="flex items-center">
              <img
                className="object-contain w-8 h-8 rounded-full mr-2"
                src={transaction?.account.coin.img}
                alt="account_type_image"
              />
              {transaction?.account.name}
            </div>
            <div>
              <div className="flex flex-shrink-0 items-center -space-x-2 mr-1.5 sm:mr-4 opacity-100">
                {assets &&
                  assets.map((asset, idx) => {
                    const assetType = MOCKUP_ASSETTYPES.find(
                      (at) => at.id === asset.asset_type_id
                    );
                    const element =
                      idx < 2 ? (
                        <img
                          src={assetType.img}
                          alt="asset type"
                          className="w-7 h-7 border-solid border-2 border-white rounded-full"
                        />
                      ) : (
                        ""
                      );
                    return element;
                  })}
                {assets.length - 2 > 0 && (
                  <div className="flex items-center justify-center text-white text-xs rounded-full bg-gray-400 border-solid border-2 border-white w-7 h-7">
                    +{assets.length - 2}
                  </div>
                )}
              </div>
            </div>
            <div>
              <span>
                {transaction?.type === "Withdrawal" ? "- " : "+ "}
                {transaction?.amount} {transaction?.assetType.elision}
              </span>
              <span className="ml-2 text-green-400 text-xs">
                ${transaction?.missingCostBasis.impact_amount}
              </span>
            </div>
          </div>
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">Net Proceeds</div>
              <div className="text-gray-700 pt-1">{detail.net_proceeds}</div>
            </div>
            <div>
              <div className="font-medium flex items-center">
                Cost Basis
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-yellow-400 ml-1 cursor-pointer"
                  id="missing-cost-basis-info"
                  onClick={onMissingCost}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <Tooltip
                  anchorId="missing-cost-basis-info"
                  place="bottom"
                  content="Missing cost basis. Click to review."
                />
              </div>
              <div className="text-gray-700 pt-1">{detail.cost_basis}</div>
            </div>
            <div>
              <div className="font-medium">Gain</div>
              <div className="pt-1 text-green-600">{detail.gain}</div>
            </div>
            <div className="border-solid border-r-2 h-8"></div>
            {detail.fee && (
              <div>
                <div className="font-medium">Fee</div>
                <div className="text-gray-700 pt-1">{detail.fee}</div>
              </div>
            )}
            <div>
              <span className="py-1 px-2 bg-yellow-100 text-orange-400 text-sm rounded-sm">
                {detail.isTaxable}
              </span>
            </div>
            <div>
              <div className="font-medium text-right">Transaction Id</div>
              <div className="text-gray-700 pt-1 flex items-center">
                {detail?.transaction_id?.substring(0, 6) +
                  "..." +
                  detail?.transaction_id?.substring(
                    detail?.transaction_id?.length - 4,
                    detail?.transaction_id?.length
                  )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2 text-blue-400 cursor-pointer"
                  id="tid-copy-clipboard"
                  onClick={() => onCopyClipboard(detail?.transaction_id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
                <Tooltip
                  anchorId="tid-copy-clipboard"
                  place="bottom"
                  content="Copy Transaction to clipboard"
                />
                <a
                  href={detail?.transaction_link + detail?.transaction_id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2 text-blue-400 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2">
                  Date
                </th>
                <th scope="col" className="p-2 w-1/3">
                  Asset
                </th>
                <th scope="col" className="p-2">
                  Change
                </th>
                <th scope="col" className="p-2">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.sent && (
                <Fragment>
                  <tr className="text-gray-900 font-medium">
                    <td className="p-2">Sent</td>
                  </tr>
                  {detail.sent.map((sent) => {
                    const assetType = MOCKUP_ASSETTYPES.find(
                      (at) => at.id === sent.asset_type_id
                    );
                    return (
                      <tr className="bg-white text-sm" key={sent.id}>
                        <td className="py-1 px-2">
                          <span className="text-red-400 font-bolder mr-1">
                            -
                          </span>
                          {format(parseISO(sent.date), "M/d/yyyy hh:mm a")}
                        </td>
                        <td className="py-1 px-2 flex items-center">
                          <img
                            src={assetType.img}
                            alt="asset type"
                            className="w-5 h-5 mr-2"
                          />
                          {assetType.name} ({assetType.elision})
                        </td>
                        <td className="py-1 px-2">
                          {sent.change} {assetType.elision}
                        </td>
                        <td className="py-1 px-2">
                          {sent.balance} {assetType.elision}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              )}
              {detail.received && (
                <Fragment>
                  <tr className="text-gray-900 font-medium">
                    <td className="p-2">Received</td>
                  </tr>
                  {detail.received.map((received) => {
                    const assetType = MOCKUP_ASSETTYPES.find(
                      (at) => at.id === received.asset_type_id
                    );
                    return (
                      <tr className="bg-white text-sm" key={received.id}>
                        <td className="py-1 px-2">
                          <span className="text-green-400 font-bolder mr-1">
                            +
                          </span>
                          {format(parseISO(received.date), "M/d/yyyy hh:mm a")}
                        </td>
                        <td className="py-1 px-2 flex items-center">
                          <img
                            src={assetType.img}
                            alt="asset type"
                            className="w-5 h-5 mr-2"
                          />
                          {assetType.name} ({assetType.elision})
                        </td>
                        <td className="py-1 px-2">
                          {received.change} {assetType.elision}
                        </td>
                        <td className="py-1 px-2">
                          {received.balance} {assetType.elision}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              )}
              {detail.fees && (
                <Fragment>
                  <tr className="text-gray-900 font-medium">
                    <td className="p-2">Fees</td>
                  </tr>
                  {detail.fees.map((fees) => {
                    const assetType = MOCKUP_ASSETTYPES.find(
                      (at) => at.id === fees.asset_type_id
                    );
                    return (
                      <tr className="bg-white text-sm" key={fees.id}>
                        <td className="py-1 px-2">
                          <span className="text-red-400 font-bolder mr-1">
                            -
                          </span>
                          {format(parseISO(fees.date), "M/d/yyyy hh:mm a")}
                        </td>
                        <td className="py-1 px-2 flex items-center">
                          <img
                            src={assetType.img}
                            alt="asset type"
                            className="w-5 h-5 mr-2"
                          />
                          {assetType.name} ({assetType.elision})
                        </td>
                        <td className="py-1 px-2">
                          {fees.change} {assetType.elision}
                        </td>
                        <td className="py-1 px-2">
                          {fees.balance} {assetType.elision}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button
            className="text-gray-900 bg-white border border-solid border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTransactionModal;
