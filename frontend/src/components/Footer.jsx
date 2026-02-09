import {
  LocationEdit,
  Mail,
  Phone,
  ChevronDown,
  Leaf,
  ArrowUp
} from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaXTwitter, 
  FaWhatsapp 
} from "react-icons/fa6";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#02352d] text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 opacity-5 text-emerald-400 rotate-45 pointer-events-none">
        <Leaf size={120} />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 text-emerald-400 -rotate-12 pointer-events-none">
        <Leaf size={100} />
      </div>
      <div className="absolute top-1/2 left-1/3 opacity-5 text-emerald-400 rotate-90 pointer-events-none">
        <Leaf size={80} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">

        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="text-emerald-400" size={28} />
              GreenLand
            </h1>
            <p className="text-sm text-gray-200">
              Bringing nature closer to you, one plant at a time.
            </p>
            <div className="flex gap-3 mt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaXTwitter size={18} />
              </a>
              <a 
                href="https://wa.me/9089785634" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium mb-1">Shop</h2>
            <Link to="/plants?category=indoor" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Indoor Plants
            </Link>
            <Link to="/plants?category=outdoor" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Outdoor Plants
            </Link>
            <Link to="/pots" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Pots & Planters
            </Link>
            <Link to="/plants" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Accessories
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium mb-1">Help</h2>
            <Link to="/care-guide" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Plant Care Guide
            </Link>
            <Link to="/shipping" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Shipping Info
            </Link>
            <Link to="/returns" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              Returns
            </Link>
            <Link to="/faq" className="footer-link text-sm text-gray-200 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium mb-1">Contact</h2>
            <div className="flex items-start gap-3 text-gray-200 text-sm">
              <LocationEdit size={18} className="flex-shrink-0 mt-0.5" />
              <p>123 Green Street, Plant City</p>
            </div>
            <a 
              href="tel:9089785634" 
              className="flex items-center gap-3 text-gray-200 hover:text-emerald-400 transition-colors duration-200 text-sm"
            >
              <Phone size={18} />
              <p>9089785634</p>
            </a>
            <a 
              href="https://wa.me/9089785634" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-200 hover:text-emerald-400 transition-colors duration-200 text-sm"
            >
              <FaWhatsapp size={18} />
              <p>WhatsApp Us</p>
            </a>
            <a 
              href="mailto:contact@greenland.com" 
              className="flex items-center gap-3 text-gray-200 hover:text-emerald-400 transition-colors duration-200 text-sm"
            >
              <Mail size={18} />
              <p>contact@greenland.com</p>
            </a>
          </div>
        </div>

        {/* Mobile Footer (Accordion) */}
        <div className="md:hidden space-y-6">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="text-emerald-400" size={28} />
              GreenLand
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              Bringing nature closer to you, one plant at a time.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-all duration-300"
              >
                <FaXTwitter size={18} />
              </a>
              <a 
                href="https://wa.me/9089785634" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="border-t border-white/20 pt-5">
            <button
              onClick={() => toggle(0)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Shop</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  open === 0 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${
              open === 0 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3 text-sm text-gray-200">
                  <Link to="/plants?category=indoor" className="hover:text-emerald-400 transition-colors duration-200">
                    Indoor Plants
                  </Link>
                  <Link to="/plants?category=outdoor" className="hover:text-emerald-400 transition-colors duration-200">
                    Outdoor Plants
                  </Link>
                  <Link to="/pots" className="hover:text-emerald-400 transition-colors duration-200">
                    Pots & Planters
                  </Link>
                  <Link to="/plants" className="hover:text-emerald-400 transition-colors duration-200">
                    Accessories
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-5">
            <button
              onClick={() => toggle(1)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Help</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${
              open === 1 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-3 text-sm text-gray-200">
                  <Link to="/care-guide" className="hover:text-emerald-400 transition-colors duration-200">
                    Plant Care Guide
                  </Link>
                  <Link to="/shipping" className="hover:text-emerald-400 transition-colors duration-200">
                    Shipping Info
                  </Link>
                  <Link to="/returns" className="hover:text-emerald-400 transition-colors duration-200">
                    Returns
                  </Link>
                  <Link to="/faq" className="hover:text-emerald-400 transition-colors duration-200">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-5">
            <button
              onClick={() => toggle(2)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-base font-medium">Contact</span>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${
              open === 2 ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 text-sm text-gray-200">
                  <div className="flex items-start gap-3">
                    <LocationEdit size={18} className="flex-shrink-0 mt-0.5" />
                    <p>123 Green Street, Plant City</p>
                  </div>
                  <a href="tel:9089785634" className="flex items-center gap-3 hover:text-emerald-400 transition-colors duration-200">
                    <Phone size={18} />
                    <p>9089785634</p>
                  </a>
                  <a href="https://wa.me/9089785634" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-emerald-400 transition-colors duration-200">
                    <FaWhatsapp size={18} />
                    <p>WhatsApp Us</p>
                  </a>
                  <a href="mailto:contact@greenland.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors duration-200">
                    <Mail size={18} />
                    <p>contact@greenland.com</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <p>© {new Date().getFullYear()} GreenLand. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-emerald-400 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Bottom Right */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-14 right-4 md:bottom-8 md:right-8 w-9 h-9 md:w-12 md:h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-20 group"
        aria-label="Back to top"
      >
        <ArrowUp size={16} className="md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;
