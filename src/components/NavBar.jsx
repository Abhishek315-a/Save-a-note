import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex flex-row justify-center gap-12 items-center bg-gray-800 h-16 text-white mb-6 shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition-colors duration-300 ${
            isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-700"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/AllPaste"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition-colors duration-300 ${
            isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-700"
          }`
        }
      >
        Saved Notes
      </NavLink>
    </div>
  );
};

export default NavBar;
