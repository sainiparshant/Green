import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="max-w-4xl">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Saved Addresses
        </h2>

        <button
          onClick={() => {
            setEditMode(false);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="border rounded-xl p-4 bg-white shadow-sm relative">
          <div className="absolute top-3 right-3">
            <input
              type="radio"
              name="defaultAddress"
              checked
              className="w-4 h-4 accent-emerald-600"
            />
          </div>

          <h3 className="font-semibold text-gray-900">Rahul Sharma</h3>
          <p className="text-sm text-gray-600 mt-1">9876543210</p>

          <p className="text-sm text-gray-700 mt-2">
            Sector 21, Near Metro Station<br />
            Noida, UP – 201301
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => {
                setEditMode(true);
                setOpen(true);
              }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <Edit2 size={14} />
              Edit
            </button>

            <button className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

      </div>

      {open && (
        <AddressModal
          editMode={editMode}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
  );
};

const AddressModal = ({ editMode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {editMode ? "Edit Address" : "Add New Address"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="Full Name" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="Phone Number" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2 sm:col-span-2" placeholder="Address" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="City" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="State" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="Pincode" />
          <input className="input outline-none border border-gray-300 rounded-lg px-3 py-2" placeholder="Country" />

        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border"
          >
            Cancel
          </button>

          <button className="px-5 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
            {editMode ? "Update Address" : "Save Address"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Address;
