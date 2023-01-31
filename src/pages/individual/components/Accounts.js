import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { setAccount } from "../../../redux/appsettingSlice";

const SEARCH_OPTIONS = [
  { id: 1, title: "All", isSelected: true },
  { id: 2, title: "Blockchain", isSelected: false },
  { id: 3, title: "Exchange", isSelected: false },
  { id: 4, title: "Wallet", isSelected: false },
];

const MOCKUP_COINS = [
  { id: 1, name: "Binance", category: "Exchange", img: "/imgs/binance.webp" },
  {
    id: 2,
    name: "Binance US",
    category: "Exchange",
    img: "/imgs/binance.webp",
  },
  {
    id: 3,
    name: "Binance Smart Chain",
    category: "Blockchain",
    img: "/imgs/binance.webp",
  },
  { id: 4, name: "Coinbase", category: "Exchange", img: "/imgs/coinbase.png" },
  {
    id: 5,
    name: "Coinbase Pro",
    category: "Exchange",
    img: "/imgs/coinbase_pro.png",
  },
  {
    id: 6,
    name: "Crypto.com",
    category: "Exchange",
    img: "/imgs/crypto.webp",
  },
  {
    id: 7,
    name: "Ethereum",
    category: "Blockchain",
    img: "/imgs/ethereum.svg",
  },
  {
    id: 8,
    name: "Gemini",
    category: "Blockchain",
    img: "/imgs/gemini.webp",
  },
  {
    id: 9,
    name: "Kraken",
    category: "Exchange",
    img: "/imgs/kraken.png",
  },
  {
    id: 10,
    name: "KuCoin",
    category: "Exchange",
    img: "/imgs/kucoin.png",
  },
  {
    id: 11,
    name: "AdaLite",
    category: "Wallet",
    img: "/imgs/adalite.webp",
  },
  {
    id: 12,
    name: "AirGap",
    category: "Wallet",
    img: "/imgs/airgap.webp",
  },
  {
    id: 13,
    name: "Polygon",
    category: "Blockchain",
    img: "/imgs/polygon.webp",
  },
];

const Accounts = (props) => {
  const { onClicked } = props;

  const dispatch = useDispatch();

  const account = useSelector((state) => state.appsetting.account);
  const [searchMenus, setSearchMenus] = useState(SEARCH_OPTIONS);
  const [searchTxt, setSearchTxt] = useState("");
  const [coins, setCoins] = useState([]);
  const [initCoins, setInitCoins] = useState([]);

  useEffect(() => {
    const updated_coins = MOCKUP_COINS.map((coin) => {
      return { ...coin, selected: false };
    });
    setCoins(updated_coins);
    setInitCoins(updated_coins);
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
    const newCoins = coins.map((coin) => {
      if (coin.id === coin_id) {
        return { ...coin, selected: !coin.selected };
      }
      return coin;
    });
    setCoins(newCoins);
    const newInitCoins = coins.map((coin) => {
      if (coin.id === coin_id) {
        return { ...coin, selected: !coin.selected };
      }
      return coin;
    });
    setInitCoins(newInitCoins);
  };

  const onBtnClicked = () => {
    const selectedCoins = initCoins.filter((coin) => coin.selected === true);
    const accountData = { ...account, coins: selectedCoins };
    dispatch(
      setAccount({
        account: accountData,
      })
    );
    onClicked();
  };

  return (
    <div>
      <h2 className="text-3xl text-center">Which platforms have you used?</h2>
      <p className="text-gray-500 mt-4 text-center">
        Select each crypto platform you have used (this can be updated later).
      </p>
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
      <div className="grid grid-cols-5 gap-8 mt-8">
        {coins.map((coin) => (
          <div
            className={`border border-solid ${
              coin.selected ? "border-blue-400" : "border-gray-200"
            } m-1 p-8 relative cursor-pointer`}
            key={coin.id}
            onClick={() => onCoinClicked(coin.id)}
          >
            {coin.selected && (
              <div className="absolute top-0 right-0 bg-blue-200 m-1 p-1 rounded-full">
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
              </div>
            )}
            <img
              className="xs:mx-auto object-contain xs:mt-6 w-12 h-12 border border-gray-300 rounded-full mx-auto"
              src={coin.img}
              alt="Binance"
            />
            <p className="text-center">{coin.name}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onBtnClicked}
      >
        Continue
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
  );
};

export default Accounts;
