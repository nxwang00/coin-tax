import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CompleteImg from "../../../assets/imgs/complete.svg";
import {
  setAccount,
  setSelectedAccountId,
} from "../../../redux/appsettingSlice";

const Finish = (props) => {
  const { onClicked } = props;

  const dispatch = useDispatch();

  const account = useSelector((state) => state.appsetting.account);
  const accounts = useSelector((state) => state.appsetting.accounts);

  const onBtnClicked = () => {
    // submit the account data to the server with api endpoint

    const accountData = { ...account, is_set: true };
    dispatch(
      setAccount({
        account: accountData,
      })
    );
    dispatch(
      setSelectedAccountId({
        selectedAccountId: accounts[0]?.id || null,
      })
    );
    onClicked();
  };

  return (
    <div>
      <img src={CompleteImg} className="mx-auto" alt="account setup finish" />
      <p className="text-4xl mt-6 text-center">Blast off!</p>
      <p className="text-gray-500 mt-4 text-lg text-center">
        You're all set to build your tax reports and track your portfolio.
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="mx-auto mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onBtnClicked}
        >
          Let's Go
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
    </div>
  );
};

export default Finish;
