import {
  Facebook,
  Instagram,
  LocationEdit,
  Mail,
  Phone,
  Twitter,
  ChevronDown
} from "lucide-react";
import React, { useState } from "react";

const Footer = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <footer className="w-full bg-[#02352d] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">GreenLand</h1>
            <p className="text-sm text-gray-200">
              Bringing nature closer to you, one plant at a time.
            </p>
            <div className="flex gap-4 mt-2">
              <Facebook className="hover:text-green-400 cursor-pointer" />
              <Instagram className="hover:text-green-400 cursor-pointer" />
              <Twitter className="hover:text-green-400 cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">Shop</h2>
            <p className="footer-link">Indoor Plants</p>
            <p className="footer-link">Outdoor Plants</p>
            <p className="footer-link">Pots & Planters</p>
            <p className="footer-link">Accessories</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">Help</h2>
            <p className="footer-link">Plant Care Guide</p>
            <p className="footer-link">Shipping Info</p>
            <p className="footer-link">Returns</p>
            <p className="footer-link">FAQ</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Contact</h2>
            <div className="flex items-start gap-3">
              <LocationEdit size={18} />
              <p className="text-sm">123 Green Street, Plant City</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <p className="text-sm">9089785634</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} />
              <p className="text-sm">contact@greenland.com</p>
            </div>
          </div>
        </div>

        {/* Mobile Footer (Accordion) */}
        <div className="md:hidden space-y-4">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">GreenLand</h1>
            <p className="text-sm text-gray-200">
              Bringing nature closer to you, one plant at a time.
            </p>
            <div className="flex gap-4">
              <Facebook />
              <Instagram />
              <Twitter />
            </div>
          </div>

          {/* Accordion Sections */}
          {[
            {
              title: "Shop",
              items: ["Indoor Plants", "Outdoor Plants", "Pots & Planters", "Accessories"]
            },
            {
              title: "Help",
              items: ["Plant Care Guide", "Shipping Info", "Returns", "FAQ"]
            },
            {
              title: "Contact",
              items: [
                "123 Green Street, Plant City",
                "9089785634",
                "contact@greenland.com"
              ]
            }
          ].map((section, index) => (
            <div key={index} className="border-t border-white/20 pt-4">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-base font-medium">{section.title}</span>
                <ChevronDown
                  className={`transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="mt-3 flex flex-col gap-2 text-sm text-gray-200">
                  {section.items.map((item, i) => (
                    <p key={i} className="footer-link">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300">
          <p>© 2024 GreenLand. All rights reserved.</p>
          <div className="flex gap-4">
            <p className="footer-link">Privacy Policy</p>
            <p className="footer-link">Terms of Service</p>
            <p className="footer-link">Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
