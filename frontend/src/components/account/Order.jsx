import React, { useState } from "react";
import { Eye } from "lucide-react";

const Order = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl">

      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        My Orders
      </h2>

      <div className="space-y-4">

        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Order #ORD-170523
            </p>
            <p className="font-medium text-gray-900">
              ₹448 · 3 Items
            </p>
            <p className="text-sm text-emerald-600">
              Delivered
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              <Eye size={16} />
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Order #ORD-170522
            </p>
            <p className="font-medium text-gray-900">
              ₹320 · 2 Items
            </p>
            <p className="text-sm text-orange-500">
              Shipped
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              <Eye size={16} />
              View Details
            </button>
          </div>
        </div>

      </div>

      {open && <OrderDetails onClose={() => setOpen(false)} />}

    </div>
  );
};

const OrderDetails = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-xl rounded-xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Order Details
        </h3>

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span>ORD-170523</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-emerald-600">Delivered</span>
          </div>

          <div className="border-t pt-3">
            <p className="font-medium mb-2">Items</p>

            <div className="flex justify-between mb-1">
              <span>Plant Pot</span>
              <span>₹200 × 2</span>
            </div>

            <div className="flex justify-between">
              <span>Indoor Plant</span>
              <span>₹48 × 1</span>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹448</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Order;
