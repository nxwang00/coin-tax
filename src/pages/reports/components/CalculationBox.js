import React from "react";

const CalculationBox = (props) => {
  return (
    <div className="flex justify-evenly items-center py-6 bg-white border border-solid border-gray-300 rounded">
      <div className="text-center">
        <div className="text-sm text-gray-500">Calculation Method</div>
        <div className="mt-2 font-medium">{props.data?.method}</div>
      </div>
      <div className="border-solid border-r-2 h-16"></div>
      <div className="text-center">
        <div className="text-sm text-gray-500">Transactions</div>
        <div className="mt-2 font-medium">{props.data?.transactions}</div>
      </div>
    </div>
  );
};

export default CalculationBox;
