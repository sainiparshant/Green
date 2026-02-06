import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  
  const cartCount = useSelector(state => state.cart.items.length);
  const auth = useSelector(state => state.auth.isAuth);
  
  const [desktopQuery, setDesktopQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const categories = [
    "Search for outdoor plants...",
    "Search for indoor plants...",
    "Search for flowers...",
    "Search for pots..."
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect - works for both desktop and mobile
  useEffect(() => {
    // Pause animation only when user is actively typing in desktop OR mobile
    if (desktopQuery.length > 0 || mobileQuery.length > 0) return;

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      const currentCategory = categories[categoryIndex];

      if (!isDeleting && charIndex < currentCategory.length) {
        setPlaceholder(currentCategory.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholder(currentCategory.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentCategory.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCategoryIndex((categoryIndex + 1) % categories.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, categoryIndex, desktopQuery, mobileQuery]);

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleDesktopSearch = () => {
    if (!desktopQuery || desktopQuery.trim() === "") return;
    navigate(`/search?query=${desktopQuery}`);
    setShowSearchSuggestions(false);
    setDesktopQuery("");
  };

  const handleMobileSearch = () => {
    if (!mobileQuery || mobileQuery.trim() === "") return;
    navigate(`/search?query=${mobileQuery}`);
    setMobileQuery("");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/plants", label: "Plants" },
    { to: "/pots", label: "Pots" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md py-3' 
            : 'bg-gray-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/" aria-label="GreenLand Home">
              <h1 className="text-emerald-800 font-bold text-xl lg:text-2xl hover:text-emerald-900 transition cursor-pointer">
                🌿 GreenLand
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative group transition hover:text-emerald-600 ${
                  location.pathname === link.to ? 'text-emerald-600' : ''
                }`}
              >
                {link.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-600 transition-all duration-300 ${
                  location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div 
            ref={searchRef}
            className="hidden lg:flex relative items-center w-80 h-11 rounded-full border border-gray-300 overflow-hidden shadow-sm bg-white"
          >
            <input
              value={desktopQuery}
              onChange={(e) => {
                setDesktopQuery(e.target.value);
                setShowSearchSuggestions(e.target.value.length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDesktopSearch();
              }}
              onFocus={() => desktopQuery && setShowSearchSuggestions(true)}
              type="text"
              placeholder={desktopQuery ? "Type to search..." : placeholder}
              className="px-4 w-full h-full outline-none text-sm text-gray-700 placeholder-gray-400"
              aria-label="Search products"
            />

            <button
              onClick={handleDesktopSearch}
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition h-full px-4 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            {/* Search Suggestions Dropdown (Optional) */}
            {showSearchSuggestions && desktopQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                <div className="p-3 text-xs text-gray-500">
                  Press Enter to search for "{desktopQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              to="/checkout/cart" 
              className="relative"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-emerald-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <Link 
              to={auth ? "/account" : "/login"}
              aria-label={auth ? "My Account" : "Login"}
            >
              <User className="w-6 h-6 text-gray-700 hover:text-emerald-600 transition" />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex lg:hidden items-center gap-4">
            <Link 
              to="/checkout/cart" 
              className="relative"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            <Link to={auth ? "/account" : "/login"} aria-label={auth ? "My Account" : "Login"}>
              <User className="w-6 h-6 text-gray-700" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-3 px-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden h-11">
            <input
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleMobileSearch();
              }}
              type="text"
              placeholder={mobileQuery ? "Type to search..." : placeholder}
              className="w-full px-4 h-full outline-none text-sm text-gray-700 placeholder-gray-400"
              aria-label="Search products"
            />
            <button
              onClick={handleMobileSearch}
              className="bg-emerald-600 hover:bg-emerald-700 transition h-full px-4 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div className="fixed top-[8rem] left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="flex flex-col text-sm font-medium text-gray-700">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-4 hover:bg-emerald-50 hover:text-emerald-600 transition border-b border-gray-100 ${
                    location.pathname === link.to ? 'bg-emerald-50 text-emerald-600' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {auth ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-4 hover:bg-emerald-50 hover:text-emerald-600 transition border-b border-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-4 hover:bg-emerald-50 hover:text-emerald-600 transition border-b border-gray-100"
                  >
                    My Orders
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-6 py-4 bg-emerald-600 text-white hover:bg-emerald-700 transition text-center font-semibold"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
