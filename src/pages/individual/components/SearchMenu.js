import React from "react";

const SearchMenu = (props) => {
  const { menu, onClicked } = props;

  return menu.isSelected ? (
    <span
      onClick={onClicked}
      className="mx-1 cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
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
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
      {menu.title}
    </span>
  ) : (
    <span
      onClick={onClicked}
      className="mx-1 cursor-pointer bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded dark:bg-gray-700 dark:text-gray-300"
    >
      {menu.title}
    </span>
  );
};

export default SearchMenu;
