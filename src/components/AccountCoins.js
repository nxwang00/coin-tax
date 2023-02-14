import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchMenu from "./AccountCoinsSearchMenu";

const SEARCH_OPTIONS = [
  { id: 1, title: "All", isSelected: true },
  { id: 2, title: "Blockchain", isSelected: false },
  { id: 3, title: "Exchange", isSelected: false },
  { id: 4, title: "Wallet", isSelected: false },
];

const AccountCoins = (props) => {
  const { onSelected, coinList } = props;

  const [searchMenus, setSearchMenus] = useState(SEARCH_OPTIONS);
  const [searchTxt, setSearchTxt] = useState("");
  const [coins, setCoins] = useState([]);
  const [initCoins, setInitCoins] = useState([]);

  useEffect(() => {
    setCoins(coinList);
    setInitCoins(coinList);
  }, []);

  const onSearchMenuClicked = (menuId) => {
    const updatedSearchMenus = searchMenus.map((menu) => {
      if (menu.id === menuId) {
        return { ...menu, isSelected: !menu.isSelected };
      } else {
        return menu;
      }
    });
    let newSearchMenus = [];
    let newCoins = [];
    if (menuId === 1) {
      newSearchMenus = updatedSearchMenus.map((menu) => {
        if (menu.id === 1) return menu;
        else return { ...menu, isSelected: false };
      });

      //reset the list of coins
      const allMenu = newSearchMenus.find((menu) => menu.id === 1);
      if (allMenu.isSelected) {
        newCoins = initCoins.filter((coin) =>
          coin.name.toLowerCase().includes(searchTxt.toLowerCase())
        );
      }
    } else {
      newSearchMenus = updatedSearchMenus.map((menu) => {
        if (menu.id === 1) return { ...menu, isSelected: false };
        else return menu;
      });

      // reset the list of coins
      const updatedCoins = initCoins.filter((coin) => {
        const cat = newSearchMenus.find(
          (menu) => menu.title == coin.category && menu.isSelected
        );
        if (cat) return true;
        else return false;
      });
      newCoins = updatedCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTxt.toLowerCase())
      );
    }
    setCoins(newCoins);
    setSearchMenus(newSearchMenus);
  };

  const onInputSearch = () => {
    let newCoins = [];
    if (searchTxt) {
      newCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTxt.toLowerCase())
      );
    } else {
      const allMenu = searchMenus.find((menu) => menu.id === 1);
      if (allMenu.isSelected) {
        newCoins = initCoins;
      } else {
        newCoins = initCoins.filter((coin) => {
          const cat = searchMenus.find(
            (menu) => menu.title == coin.category && menu.isSelected
          );
          if (cat) return true;
          else return false;
        });
      }
    }
    setCoins(newCoins);
  };

  const onCoinClicked = (coin_id) => {
    onSelected(coin_id);
  };

  return (
    <div>
      <div className="relative mt-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full pl-10 text-sm text-gray-900 border border-solid border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search coin..."
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") onInputSearch();
          }}
        />
      </div>
      <div className="mt-2">
        {searchMenus.map((menu) => (
          <SearchMenu
            key={menu.id}
            menu={menu}
            onClicked={() => onSearchMenuClicked(menu.id)}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-8 mt-8 overflow-y-scroll h-96">
        {coins.map((coin) => (
          <div
            className="border border-solid border-gray-200 m-1 p-8 h-36 relative cursor-pointer"
            key={coin.id}
            onClick={() => onCoinClicked(coin.id)}
          >
            <img
              className="xs:mx-auto object-contain xs:mt-6 w-12 h-12 border border-gray-300 rounded-full mx-auto"
              src={coin.img}
              alt="Binance"
            />
            <p className="text-center">{coin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountCoins;
