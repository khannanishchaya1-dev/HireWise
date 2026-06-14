import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainNavbar = (props) => {
  return (
    <header className="bg-[#001E2B] border-b border-[#1f3a47] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Hire<span className="text-[#00ED64]">Wise</span>
        </h1>

        <div className="relative">
          <button
            onClick={() => props.setOpen(!props.open)}
            aria-label="Open user menu"
            aria-expanded={props.open}
            className="text-2xl sm:text-3xl text-white hover:text-[#00ED64] transition-colors"
          >
            <FaUserCircle />
          </button>

          {props.open && (
            <div className="absolute right-0 mt-3 w-60 bg-[#112733] border border-[#1f3a47] rounded-xl shadow-lg shadow-black/30 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#1f3a47]">
                <p className="text-white font-semibold truncate">
                  {props.user?.username}
                </p>

                <p className="text-gray-400 text-sm truncate">
                  {props.user?.email}
                </p>
              </div>

              <Link
                to="/"
                onClick={() => props.setOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:bg-[#0D2530] hover:text-[#00ED64] transition-colors border-b border-[#1f3a47]"
              >
                About us
              </Link>

              <button
                onClick={props.handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:bg-[#0D2530] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;