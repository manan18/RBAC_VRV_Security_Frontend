import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 w-full">
      <div className="mx-auto flex justify-between items-center relative w0-full">
        {/*  Logo */}
        <h1 className="text-xl font-bold">RBAC Dashboard</h1>

        {/* Hamburger Button (Visible on smaller screens) */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-gray-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`md:flex md:items-center md:space-x-4 absolute md:relative bg-gray-800 md:bg-transparent left-0 w-full md:w-auto ${
            isMenuOpen ? "block top-16" : "hidden md:flex"
          }`}
        >
          <Link
            to="/"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:p-0"
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:p-0"
          >
            Users
          </Link>
          <Link
            to="/roles"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:p-0"
          >
            Roles
          </Link>
          <Link
            to="/permissions"
            className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent md:p-0"
          >
            Permissions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
