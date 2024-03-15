import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";
import Avatar from "react-avatar";
const utilize_logo = "/assets/utilize_logo.jfif";

const Header = () => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center md:pl-16 md:pr-10 md:h-20 bg-white border-b-2">
        <div className="w-42 flex items-center justify-center">
          <img
            src={utilize_logo}
            alt="Utilize"
            width="50px"
            height="50px"
            className="w-20 md:w-20 h-14 md:pb-0 object-contain"
          />
          <h3 className="font-bold text-2xl text-gray-500">Utilize</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-5 flex-1 justify-end w-full gap-5">
          <form className="sm:flex items-center space-x-5 bg-white rounded-md p-1 pl-5 shadow-md flex-1 md:flex-initial hidden">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-1 md:p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          <Avatar
            name="Abhay Singh"
            round
            size="50"
            color="#0055d1"
            className="md:mt-0 hidden md:flex"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
