import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  parseISO,
  getYear,
  parse,
  compareAsc,
  compareDesc,
  formatISO,
} from "date-fns";
import EmptyState from "../../../assets/imgs/empty_state.svg";
import {
  MOCKUP_REVIEW_TRANSACTIONS,
  MOCKUP_ASSETTYPES,
  MOCKUP_MISSING_COST_BASIS_INFOS,
  MOCKUP_REVIEW_TRANSACTION_DETAIL,
} from "../../../services/mockus";
import EditTransactionModal from "../../../components/EditTransactionModal";
import MissingCostModal from "./MissingCostModal";
import ViewTransactionModal from "./ViewTransactionModal";

const ReviewList = (props) => {
  const { filters } = props;

  const accounts = useSelector((state) => state.appsetting.accounts);
  const [trans, setTrans] = useState([]);
  const [initTrans, setInitTrans] = useState([]);

  const [assetTypes, setAssetTypes] = useState([]);

  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedTran, setSelectedTran] = useState(null);

  const [isMissingModal, setIsMissingModal] = useState(false);

  const [isViewModal, setIsViewModal] = useState(false);

  useEffect(() => {
    const accountTrans = MOCKUP_REVIEW_TRANSACTIONS.map((trns) => {
      const account = accounts.find((acc) => acc.id == trns.account_id);
      const missingCostBasis = MOCKUP_MISSING_COST_BASIS_INFOS.find(
        (msb) => msb.review_id == trns.id
      );
      const assetType = MOCKUP_ASSETTYPES.find(
        (asset_type) => asset_type.id == missingCostBasis.asset_type_id
      );
      return { ...trns, account, missingCostBasis, assetType };
    });
    setTrans(accountTrans);
    setInitTrans(accountTrans);
    setAssetTypes(MOCKUP_ASSETTYPES);
  }, []);

  useEffect(() => {
    const sort = filters.sort;
    const account_ids = filters.account_ids;
    const date_range = filters.date_range;
    const asset_type_id = filters.asset_type_id;
    const tran_types = filters.tran_types;

    let newReviewTrans;
    if (sort === "ascending")
      newReviewTrans = initTrans.sort((a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
      );
    else
      newReviewTrans = initTrans.sort((a, b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
      );

    if (account_ids && account_ids.length)
      newReviewTrans = newReviewTrans.filter((reviewTran) =>
        account_ids.includes(parseInt(reviewTran.account_id))
      );

    if (asset_type_id && asset_type_id !== "0") {
      newReviewTrans = newReviewTrans.filter((reviewTran) => {
        const detail = MOCKUP_REVIEW_TRANSACTION_DETAIL.find(
          (tranDetail) => tranDetail.transaction_id === reviewTran.id
        );

        const sentAssetTypeIds = detail.sent
          ? detail.sent.map((detailSent) => detailSent.asset_type_id)
          : [];
        const receivedAssetTypeIds = detail.received
          ? detail.received.map(
              (detailReceived) => detailReceived.asset_type_id
            )
          : [];
        const feeAssetTypeIds = detail.fees
          ? detail.fees.map((detailFee) => detailFee.asset_type_id)
          : [];
        const assetTypeIds = [
          ...sentAssetTypeIds,
          ...receivedAssetTypeIds,
          ...feeAssetTypeIds,
        ];
        if (assetTypeIds.includes(asset_type_id)) return true;
        return false;
      });
    }

    if (date_range && date_range.startDate) {
      newReviewTrans = newReviewTrans.filter((reviewTran) => {
        console.log(
          compareDesc(
            parse(date_range.startDate, "yyyy-M-d", new Date()),
            parseISO(reviewTran.date)
          )
        );
        if (
          (compareDesc(
            parse(date_range.startDate, "yyyy-M-d", new Date()),
            parseISO(reviewTran.date)
          ) === 1 ||
            compareDesc(
              parse(date_range.startDate, "yyyy-M-d", new Date()),
              parseISO(reviewTran.date)
            ) === 0) &&
          (compareDesc(
            parseISO(reviewTran.date),
            parse(date_range.endDate, "yyyy-M-d", new Date())
          ) === 1 ||
            compareDesc(
              parseISO(reviewTran.date),
              parse(date_range.endDate, "yyyy-M-d", new Date())
            ) === 0)
        ) {
          return true;
        }
        return false;
      });
    }

    if (tran_types && tran_types.length)
      newReviewTrans = newReviewTrans.filter((reviewTran) =>
        tran_types.includes(reviewTran.type)
      );

    setTrans(newReviewTrans);
  }, [filters, initTrans]);

  const onTransactionEdit = (tran, e) => {
    e.stopPropagation();
    setSelectedTran(tran);
    setIsEditModal(true);
  };

  const onEditModalSave = (data) => {
    const newTrans = trans.map((tran) => {
      if (tran.id == data.id) {
        return {
          ...tran,
          type: data.classification,
          date: formatISO(data.dateTime),
        };
      }
      return tran;
    });
    setTrans(newTrans);
    const newInitTrans = initTrans.map((tran) => {
      if (tran.id == data.id) {
        return {
          ...tran,
          type: data.classification,
          date: formatISO(data.dateTime),
        };
      }
      return tran;
    });
    setInitTrans(newInitTrans);
  };

  const onEditModalCancel = () => {
    setIsEditModal(false);
  };

  const onMissingModalTroubleshoot = () => {
    setIsMissingModal(false);
  };

  const onMissingModalCancel = () => {
    setIsMissingModal(false);
  };

  const onMissingCostView = (tran, e) => {
    e.stopPropagation();
    setSelectedTran(tran);
    setIsMissingModal(true);
  };

  const onTranClicked = (tran, e) => {
    e.stopPropagation();
    setSelectedTran(tran);
    setIsViewModal(true);
  };

  const onMissingCostInfo = () => {
    setIsViewModal(false);
    setIsMissingModal(true);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center">
        <span className="mr-4"> To Review ({trans.length}) </span>
      </div>
      <div className="block p-4 bg-white border border-solid border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700">
        {trans.length === 0 ? (
          <div className="my-32">
            <img src={EmptyState} className="mx-auto" alt="Empty State" />
            <p className="text-center text-gray-400">
              Please upload some transactions...
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <tbody>
                {trans.map((tran) => {
                  const detail = MOCKUP_REVIEW_TRANSACTION_DETAIL.find(
                    (rtd) => rtd.transaction_id === tran.id
                  );
                  const received = detail.received || [];
                  const sent = detail.sent || [];
                  const assets = [...received, ...sent];
                  return (
                    <tr
                      style={{ borderBottom: "1px solid #e8e8e8" }}
                      key={tran.id}
                      onClick={(e) => onTranClicked(tran, e)}
                    >
                      <td className="px-2 py-2">
                        {format(parseISO(tran.date), "MMM dd, yyyy hh:mm a")}
                      </td>
                      <td className="px-2 py-3 flex items-center">
                        {tran.type === "Withdrawal" ? (
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
                        {tran.type}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center">
                          <img
                            className="object-contain w-6 h-6 rounded-full mr-2"
                            src={tran.account.coin.img}
                            alt="account_type_image"
                          />
                          {tran.account.name}
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex flex-shrink-0 items-center -space-x-2 mr-1.5 sm:mr-4 opacity-100">
                          {assets &&
                            assets.map((asset, idx) => {
                              const assetType = assetTypes.find(
                                (at) => at.id === asset.asset_type_id
                              );
                              const element =
                                idx < 2 ? (
                                  <img
                                    key={idx}
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
                      </td>
                      <td className="px-2 py-3">
                        <span>
                          {tran.type === "Withdrawal" ? "- " : "+ "}
                          {tran.amount} {tran.assetType.elision}
                        </span>
                        <span className="ml-2 text-green-400 text-xs">
                          ${tran.missingCostBasis.impact_amount}
                        </span>
                      </td>
                      <td className="px-2 py-3 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 cursor-pointer text-yellow-600 mr-4"
                          onClick={(e) => onMissingCostView(tran, e)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 cursor-pointer text-blue-600"
                          onClick={(e) => onTransactionEdit(tran, e)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <EditTransactionModal
          isOpen={isEditModal}
          transaction={selectedTran}
          onSave={onEditModalSave}
          onCancel={onEditModalCancel}
        />
        <ViewTransactionModal
          isOpen={isViewModal}
          transaction={selectedTran}
          onCancel={() => setIsViewModal(false)}
          onMissingCost={onMissingCostInfo}
        />
        <MissingCostModal
          isOpen={isMissingModal}
          tranId={selectedTran?.id}
          onTroubleshoot={onMissingModalTroubleshoot}
          onCancel={onMissingModalCancel}
        />
      </div>
    </div>
  );
};

export default ReviewList;
