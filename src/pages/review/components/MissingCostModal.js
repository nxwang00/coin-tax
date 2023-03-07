import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import {
  MOCKUP_MISSING_COST_BASIS_INFOS,
  MOCKUP_ASSETTYPES,
} from "../../../services/mockus";

const MissingCostModal = (props) => {
  const { isOpen, tranId, onSave, onCancel } = props;

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (tranId) {
      const missingInfo = MOCKUP_MISSING_COST_BASIS_INFOS.find(
        (basis_info) => basis_info.review_id == tranId
      );
      const assetType = MOCKUP_ASSETTYPES.find(
        (at) => at.id == missingInfo.asset_type_id
      );
      const newMissingInfo = { ...missingInfo, asset_type: assetType };
      setInfo(newMissingInfo);
    }
  }, [tranId]);

  const onSaveClick = () => {
    onSave();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      classNames={{
        modal: "reactModal",
      }}
      center
    >
      <div className="py-4 px-2">
        <span className="font-medium">Missing Cost Basis</span>
        <div className="mt-4">
          <span className="text-gray-600">
            Based on your imported transaction data, it’s unclear how you
            originally acquired a total of {info?.amount_1}{" "}
            {info?.asset_type?.elision}. This is leading to missing cost basis
            for this transaction and future transactions.
          </span>
          <div className="flex items-center bg-amber-50 p-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span className="ml-2">Potential Report Impact:</span>
            <span className="text-orange-400 ml-2">
              {" "}
              $ {info?.impact_amount}{" "}
            </span>
          </div>
          <div className="mt-4">
            <span className="text-sm">
              {info?.asset_type?.elision} With Missing Cost Basis In This
              Transaction
            </span>
          </div>
          <div className="px-2 py-1.5 border border-solid border-gray-200 mt-1">
            <span className="text-sm">{info?.amount_2}</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end">
          <button
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded text-sm px-5 pt-1.5 pb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={onSaveClick}
          >
            Troubleshoot this issue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MissingCostModal;
