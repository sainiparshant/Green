import React, { useState } from "react";
import {
  User,
  MapPin,
  ShoppingBag,
  LogOut,
  ImageOff,
} from "lucide-react";
import Profile from "../components/account/Profile";
import Address from "../components/account/Address";
import Order from "../components/account/Order";
import API from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("profile");

  const logoutHandler = async () => {
    try {
      await API.get("/auth/logout");
      dispatch(logout());
      navigate("/");
      toast.success("logout Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[90vh]">
      <div className="hidden md:flex w-80 border-r border-gray-200 p-6 flex-col">
        <div>
          <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
            {user.image ? (
              <img
                src={user.image.url}
                alt={user.name}
                className="w-22 h-25 sm:w-30 sm:h-30 object-cover rounded-full"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="w-22 h-25 sm:w-30 sm:h-30 flex items-center justify-center bg-gray-100 rounded-full">
                <ImageOff className="text-gray-400" size={28} />
              </div>
            )}
            <div>
              <h1 className="text-lg font-semibold">{user.name || "User"}</h1>
              <p className="text-sm text-gray-500 italic">
                {user.email || user.phone}
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
          <button
            onClick={() => logoutHandler()}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl bg-gray-100 hover:bg-black hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {activeTab === "profile" && <Profile user={user} />}
        {activeTab === "address" && <Address />}
        {activeTab === "order" && <Order />}
      </div>
    </div>
  );
};

export default Account;
