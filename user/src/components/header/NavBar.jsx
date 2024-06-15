import React from "react";
import LogoImg from "../../assets/images/logo/Logo.png";
import SearchBar from "./SearchBar";
import UserBtn from "./userBtn";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
const NavBar = () => {
  const {cartAmount} = useCartContext();
  return (
    <>
      <header className="min-h-16">
        <div className="flex items-center">
          {/* logo */}
          <div className="mr-auto md:w-48 flex-shrink-0">
            <Link to="/">
              <img className="h-8 md:h-10" src={LogoImg} alt="" />
            </Link>
          </div>
          {/* search */}
          <div className="w-full h-full max-w-xs xl:max-w-lg 2xl:max-w-2xl hidden xl:flex items-center">
            <SearchBar />
          </div>
          {/* phone number */}
          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold md:text-xl">090 7089078</span>
            <span className="font-semibold text-sm text-gray-400">
              Hotline - Hỗ Trợ 24/7
            </span>
          </div>
          {/* buttons */}
          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              {/* wishlist */}
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className="" href="">
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    3
                  </div>
                  <svg
                    className="h-9 lg:h-10 p-2 text-gray-500"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                    />
                  </svg>
                </a>
              </li>
              {/* cart */}
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className="" href="/cart">
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    {cartAmount}
                  </div>
                  <svg
                    className="h-9 lg:h-10 p-2 text-gray-500"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="shopping-cart"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                    />
                  </svg>
                </a>
              </li>
              {/* user */}
              <li className="ml-2 lg:ml-4 relative inline-block">
                <UserBtn />
              </li>
            </ul>
          </nav>
        </div>
        <div className="xl:hidden sm:block my-2">
          <SearchBar />
        </div>
        <hr className="mt-4" />
      </header>
    </>
  );
};

export default NavBar;
