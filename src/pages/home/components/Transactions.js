import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  format,
  parseISO,
  getYear,
  compareAsc,
  compareDesc,
  formatISO,
} from "date-fns";
import EmptyState from "../../../assets/imgs/empty_state.svg";
import { MOCKUP_TRANSACTIONS } from "../../../services/mockus";
import EditTransactionModal from "../../../components/EditTransactionModal";

const Transactions = (props) => {
  const { connected } = props;
  const selectedAccountId = useSelector(
    (state) => state.appsetting.selectedAccountId
  );
  const accounts = useSelector((state) => state.appsetting.accounts);
  const account = accounts.find((acc) => acc.id === selectedAccountId);

  const [trans, setTrans] = useState([]);
  const [initTrans, setInitTrans] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSeletedYear] = useState(0);
  const [selectedSort, setSeletedSort] = useState("descending");

  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedTran, setSelectedTran] = useState(null);

  useEffect(() => {
    // Fetch the list of transactions with selectedAccountId
    if (account.status === "connected") {
      setTrans(MOCKUP_TRANSACTIONS);
      setInitTrans(MOCKUP_TRANSACTIONS);

      const uniqueYears = getUniqueYears(MOCKUP_TRANSACTIONS);
      setYears(uniqueYears);
    } else {
      setTrans([]);
      setInitTrans([]);
    }
  }, [account, connected]);

  const getUniqueYears = (transactions) => {
    const result = transactions.map((transs) => getYear(parseISO(transs.date)));
    return [...new Set(result)];
  };

  const onYearSelect = (e) => {
    const selected_year = e.target.value;
    setSeletedYear(selected_year);

    let updatedTrans;
    if (selected_year == 0) updatedTrans = initTrans;
    else
      updatedTrans = initTrans.filter(
        (tran) => getYear(parseISO(tran.date)) == selected_year
      );

    let newTrans;
    if (selectedSort === "ascending")
      newTrans = updatedTrans.sort((a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
      );
    else
      newTrans = updatedTrans.sort((a, b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
      );
    setTrans(newTrans);
  };

  const onSortSelect = (e) => {
    const selected_sort = e.target.value;
    setSeletedSort(selected_sort);
    let newTrans;
    if (selected_sort === "ascending")
      newTrans = trans.sort((a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
      );
    else
      newTrans = trans.sort((a, b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
      );
    setTrans(newTrans);
  };

  const onTransactionEdit = (tran) => {
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

  return (
    <div className="block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8">
      <div className="flex items-center">
        <span className="mr-4">{trans.length} transactions</span>
        <select
          className="block p-2 mr-4 text-xs text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedYear}
          onChange={(e) => onYearSelect(e)}
        >
          <option value="0">All Years</option>
          {years.map((year, idx) => (
            <option value={year} key={idx}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="block p-2 text-xs text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedSort}
          onChange={onSortSelect}
        >
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </select>
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
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
              {trans.map((tran) => (
                <tr style={{ borderBottom: "1px solid #e8e8e8" }} key={tran.id}>
                  <td className="px-6 py-4">
                    {format(parseISO(tran.date), "MMM dd, yyyy hh:mm a")}
                  </td>
                  <td className="px-6 py-4 flex items-center">
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
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="object-contain w-8 h-8 rounded-full mr-2"
                        src={account.coin.img}
                        alt="account_type_image"
                      />
                      {account.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {tran.type === "Withdrawal" ? "- " : "+ "}
                    {tran.amount} ETH
                  </td>
                  <td className="px-6 py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 cursor-pointer text-blue-600"
                      onClick={() => onTransactionEdit(tran)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
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
    </div>
  );
};

export default Transactions;
