import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { Link } from "react-router-dom";

const AddressPage = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const data = await API.get("/address/get-addrs");
      setAddresses(data.data.data);
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      await API.patch(`/address/update-default/${id}`, { isDefault: true });
      toast.success("Default address updated");
      fetchAddresses();
    } catch {
      toast.error("Failed to set default address");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await API.delete(`/address/remove-addr/${id}`);
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-2 py-8 pb-32">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
            Saved Addresses
          </h2>

          <button
            onClick={() => {
              setEditMode(false);
              setCurrentAddress(null);
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`relative rounded-xl border bg-white p-5 transition-shadow ${
                addr.isDefault
                  ? "border-emerald-600 shadow-md"
                  : "border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="absolute top-4 right-4">
                <input
                  type="radio"
                  name="defaultAddress"
                  checked={addr.isDefault}
                  onChange={() => setDefaultAddress(addr._id)}
                  className="w-4 h-4 accent-emerald-600"
                />
              </div>

              {addr.isDefault && (
                <span className="inline-block mb-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Default
                </span>
              )}

              <h3 className="font-medium text-gray-900">
                {addr.fullName}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {addr.phone}
              </p>

              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                {addr.address}, {addr.city}, {addr.state} – {addr.pinCode}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentAddress(addr);
                    setEditMode(true);
                    setOpen(true);
                  }}
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Edit2 size={14} />
                  Edit
                </button>

                <button
                  onClick={() => deleteAddress(addr._id)}
                  className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {open && (
          <AddressModal
            editMode={editMode}
            onClose={() => setOpen(false)}
            addressData={currentAddress}
            refreshList={fetchAddresses}
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4">
        <Link to="/checkout/payment">
          <button className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

const AddressModal = ({ editMode, onClose, addressData, refreshList }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  useEffect(() => {
    if (editMode && addressData) {
      setFormData({
        fullName: addressData.fullName || "",
        phone: addressData.phone || "",
        address: addressData.address || "",
        city: addressData.city || "",
        state: addressData.state || "",
        pinCode: addressData.pinCode || "",
        country: addressData.country || "",
      });
    }
  }, [editMode, addressData]);

  const submitHandler = async () => {
    try {
      if (editMode) {
        await API.patch(`/address/update-addr/${addressData._id}`, formData);
        toast.success("Address updated successfully");
      } else {
        await API.post("/address/add-addr", formData);
        toast.success("Address saved successfully");
      }
      refreshList();
      onClose();
    } catch {
      toast.error("Failed to save address");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h3 className="mb-5 text-lg font-semibold text-gray-900">
          {editMode ? "Edit Address" : "Add New Address"}
        </h3>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["fullName", "Full Name"],
            ["phone", "Phone Number"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["pinCode", "Pincode"],
            ["country", "Country"],
          ].map(([key, placeholder]) => (
            <input
              key={key}
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              placeholder={placeholder}
              className={`rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 ${
                key === "address" ? "sm:col-span-2" : ""
              }`}
            />
          ))}
        </form>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={submitHandler}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            {editMode ? "Update Address" : "Save Address"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
