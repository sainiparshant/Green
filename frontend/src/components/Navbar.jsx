import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useSelector } from "react-redux";
import API from "../api/axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector(state => state.cart.items.length);
  const auth = useSelector(state => state.auth.isAuth);  
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const categories = [
    "Search for outdoor plants...",
    "Search for indoor plants...",
    "Search for flowers...",
    "Search for pots..."
  ];

  // Typewriter effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000; // Pause at end of word

    const timer = setTimeout(() => {
      const currentCategory = categories[categoryIndex];

      if (!isDeleting && charIndex < currentCategory.length) {
        // Typing
        setPlaceholder(currentCategory.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setPlaceholder(currentCategory.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentCategory.length) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next category
        setIsDeleting(false);
        setCategoryIndex((categoryIndex + 1) % categories.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, categoryIndex]);

  const handleSearch = () => {
    if (!query || query.trim() === "") return;
    navigate(`/search?query=${query}`);
  };

  return (
    <div>
      <div className="w-full py-4 lg:px-18 px-4 bg-gray-200/50 flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="text-emerald-800 font-bold text-xl lg:text-2xl hover:text-emerald-900 transition cursor-pointer">
              GreenLand
            </h1>
          </Link>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter") handleSearch()
            }}
            type="text"
            placeholder={placeholder}
            className="px-3 w-full bg-white h-full outline-none text-sm text-gray-700 placeholder-gray-400"
          />

          <button 
            onClick={handleSearch}
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition h-full px-3 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex justify-between gap-6 cursor-pointer">
         <Link to="/checkout/cart" className="relative inline-block">
      <ShoppingCart className="text-gray-800 hover:text-emerald-700 transition" size={26} />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
          <Link to={auth === false ? "/login" : "/account"}>
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
