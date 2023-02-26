import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Select from "react-tailwindcss-select";
import DateTimePicker from "react-datetime-picker";
import { format, parseISO } from "date-fns";
import {
  TRANSACTION_CLASSIFICATION,
  MOCKUP_SEND_ASSETS,
  MOCKUP_RECEIVE_ASSETS,
  MOCKUP_FEE_ASSETS,
} from "../services/mockus";
import AssetAccordion from "./AssetAccordion";

const EditTransactionModal = (props) => {
  const { isOpen, transaction, onSave, onCancel } = props;

  const [classiOptions, setClassiOptions] = useState([]);
  const [classification, setClassification] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [sendAssets, setSendAssets] = useState([]);
  const [receiveAssets, setReceiveAssets] = useState([]);
  const [feeAssets, setFeeAssets] = useState([]);

  useEffect(() => {
    // const classiOptionList = TRANSACTION_CLASSIFICATION.map((classif) => {
    //   return { value: classif.name, label: classif.name };
    // });
    setClassiOptions(TRANSACTION_CLASSIFICATION);
    setSendAssets(MOCKUP_SEND_ASSETS);
    setReceiveAssets(MOCKUP_RECEIVE_ASSETS);
    setFeeAssets(MOCKUP_FEE_ASSETS);
  }, []);

  useEffect(() => {
    setClassification(transaction ? transaction.type : "");
    setDateTime(transaction ? parseISO(transaction.date) : new Date());
  }, [transaction]);

  const onSaveClick = () => {
    const data = {
      id: transaction.id,
      classification,
      dateTime,
    };
    onSave(data);
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
        <span className="font-medium">Edit Transaction</span>
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">
                Classification
              </label>
              {/* <Select
                primaryColor={"blue"}
                value={classification}
                onChange={(val) => setClassification(val)}
                options={classiOptions}
                isSearchable
              /> */}
              <select
                className="block py-1.5 px-2 w-full text-sm border border-solid border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
              >
                {classiOptions.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white">
                Timestamp
              </label>
              <DateTimePicker
                onChange={(val) => setDateTime(val)}
                value={dateTime}
                disableClock
                disableCalendar
                format="y-MM-dd hh:mm:ss"
                className="w-full rounded border border-solid border-gray-300 pt-1 pb-0.5 px-2 text-sm"
              />
            </div>
          </div>
          <div className="text-sm flex items-center mt-2 text-green-600">
            <span className="mr-4 flex items-center">
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              1 sent asset
            </span>
            <span className="mr-4 flex items-center">
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              0 received assets
            </span>
            <span className="flex items-center">
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              0 or more fees
            </span>
          </div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="grid grid-cols-3 gap-4">
            <AssetAccordion initAssets={sendAssets} title="Sent" />
            <AssetAccordion initAssets={receiveAssets} title="Received" />
            <AssetAccordion initAssets={feeAssets} title="Fees" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button
            className="text-gray-900 bg-white border border-solid border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={onCancel}
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
  );
};

export default EditTransactionModal;
