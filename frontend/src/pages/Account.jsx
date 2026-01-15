import React, { useState } from "react";
import { User, MapPin, ShoppingBag, LogOut } from "lucide-react";
import Profile from "../components/account/Profile";
import Address from "../components/account/Address";
import Order from "../components/account/Order";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-[90vh]">

      <div className="hidden md:flex w-80 border-r border-gray-200 p-6 flex-col">
        <div>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
            <img
              src="/public/outdoor.jpg"
              alt="User avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-lg font-semibold">Name</h1>
              <p className="text-sm text-gray-500 italic">
                email123@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
                ${
                  activeTab === "profile"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <User size={20} />
              Profile
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
                ${
                  activeTab === "address"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <MapPin size={20} />
              Addresses
            </button>

            <button
              onClick={() => setActiveTab("order")}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
                ${
                  activeTab === "order"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <ShoppingBag size={20} />
              Orders
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl bg-gray-100 hover:bg-black hover:text-white">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "profile" && <Profile />}
        {activeTab === "address" && <Address />}
        {activeTab === "order" && <Order />}
      </div>

    </div>
  );
};

export default Account;
