import React, { useEffect, useState } from "react";
import Accordion from "react-accordion-comp";
import "react-accordion-comp/dist/styles.css";
import AssetItem from "./AssetItem";

const AssetAccordion = (props) => {
  const { initAssets, title } = props;

  const [flag, setFlag] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(initAssets);
  }, [initAssets]);

  const onTitleClick = () => {
    setFlag(!flag);
  };

  const onAddItem = () => {
    const newItemId =
      assets.length > 0
        ? (parseInt(assets[assets.length - 1].id) + 1).toString()
        : "1";
    const newItem = {
      id: newItemId,
      type_id: "0",
      amount: "0",
      historical_price: "0",
      historical_value: "0",
    };
    const newAssets = [...assets, newItem];
    setAssets(newAssets);
  };

  const onDeleteItem = (itemId) => {
    const newAssets = assets.filter((asset) => asset.id !== itemId);
    setAssets(newAssets);
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-white">
        {title}
      </label>
      <div className="flex justify-between items-center bg-sky-200 text-sm px-2 py-1.5 border border-solid border-gray-300">
        <span
          onClick={onTitleClick}
          className="cursor-pointer flex items-center"
        >
          {flag ? (
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
          <span>Assets ({assets.length})</span>
        </span>
        <span
          className="text-blue-700 text-sm font-semibold mr-4 cursor-pointer"
          onClick={onAddItem}
        >
          + Add
        </span>
      </div>
      <Accordion isOpen={flag}>
        <div className="border border-solid border-gray-300 px-3 pt-1 pb-2 overflow-y-auto h-72">
          {assets.map((asset) => (
            <AssetItem
              key={asset.id}
              item={asset}
              onClose={(itemId) => onDeleteItem(itemId)}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default AssetAccordion;
