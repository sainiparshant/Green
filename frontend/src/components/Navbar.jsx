import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <div className="w-full py-4 lg:px-18 px-4 bg-gray-200/50 flex justify-between items-center">
        <div>
          <h1 className="text-emerald-800 font-bold text-xl lg:text-2xl">
            GreenLand
          </h1>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-md font-medium text-gray-700">
          <Link
            to="/"
            className="relative group transition hover:text-emerald-600"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/plants"
            className="relative group transition hover:text-emerald-600"
          >
            Plants
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/pots"
            className="relative group transition hover:text-emerald-600"
          >
            Pots
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/contact"
            className="relative group transition hover:text-emerald-600"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-72 h-11 rounded-full border border-gray-300 overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 w-full bg-white h-full outline-none text-sm text-gray-700 placeholder-gray-400"
          />

          <button className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition h-full px-3 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex justify-between gap-6 cursor-pointer">
          <ShoppingCart />
          <Link to="/login">
            <User />
          </Link>
          {isMobileMenuOpen ? (
            <X
              className="lg:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ) : (
            <Menu
              className="lg:hidden cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          )}
        </div>
      </div>

      <div className="block lg:hidden ">
        <div className="flex items-center bg-white border border-gray-300 shadow-sm overflow-hidden">

          <button className="p-2 cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="Search plants, pots..."
            className="w-full pl-2 py-2 text-sm outline-none text-gray-700 placeholder-gray-400 rounded-full"
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed min-h-screen top-15 left-0 w-full bg-white  z-50">
          <div className="flex flex-col py-4 text-sm font-medium text-gray-700">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              Home
            </Link>

            <Link
              to="/plants"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              Plants
            </Link>

            <Link
              to="/pots"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              Pots
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-5 py-3 hover:bg-emerald-50 hover:text-emerald-600 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
