import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import UserDefaultAvatar from "../assets/imgs/user_default_avatar.png";

const Topbar = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(0);

  useEffect(() => {
    document.addEventListener("mousedown", Clickout);
    return () => {
      document.removeEventListener("mousedown", Clickout);
    };
  }, []);

  const Clickout = ({ target }) => {
    if (ref.current && !ref.current.contains(target)) {
      setShowUserMenu(false);
    }
  };

  const onAvatarClicked = () => {
    setShowUserMenu(!showUserMenu);
  };

  const onSignoutClick = () => {
    dispatch(logout());
    window.sessionStorage.clear();
  };

  const onMenuClick = (menuTitle) => {
    if (menuTitle === "import") {
      setCurrentMenu(0);
      navigate("/");
    } else if (menuTitle === "review") {
      setCurrentMenu(1);
      navigate("/review");
    } else if (menuTitle === "reports") {
      setCurrentMenu(2);
      navigate("/reports");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-2.5 pr-16 pl-14 shadow-sm">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Tax Reports
            </span>
          </a>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto ml-16"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <span
                  className={`block p-0 cursor-pointer ${
                    currentMenu === 0 ? "text-blue-700" : "hover:text-blue-700"
                  }`}
                  onClick={() => onMenuClick("import")}
                >
                  Import
                </span>
              </li>
              <li>
                <span
                  className={`block p-0 cursor-pointer ${
                    currentMenu === 1 ? "text-blue-700" : "hover:text-blue-700"
                  }`}
                  onClick={() => onMenuClick("review")}
                >
                  Review
                </span>
              </li>
              <li>
                <span
                  className={`block p-0 cursor-pointer ${
                    currentMenu === 2 ? "text-blue-700" : "hover:text-blue-700"
                  }`}
                  onClick={() => onMenuClick("reports")}
                >
                  Tax Reports
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center" ref={ref}>
          <button
            type="button"
            className="flex mr-2 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={onAvatarClicked}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-10 h-10 rounded-full"
              src={UserDefaultAvatar}
              alt="user avatar"
            />
          </button>
          <div
            className={`${
              !showUserMenu ? "hidden" : ""
            } absolute top-16 right-16 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user.email.split("@")[0]}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <span
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={onSignoutClick}
                >
                  Sign out
                </span>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
