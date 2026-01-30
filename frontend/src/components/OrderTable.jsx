import React from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders }) => {
    
    const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3">Order#</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Payment</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {orders.length === 0 && (
            <tr>
              <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">
                {order.orderNumber}
              </td>

              <td className="px-4 py-3">
                {order.user_detail?.name}
              </td>

              <td className="px-4 py-3">
                ₹{order.totalAmount}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {order.orderStatus}
                </span>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      order.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {order.paymentStatus}
                </span>
              </td>

              <td className="px-4 py-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-center">
                  <button
                  onClick={}
                    className="px-3 py-1 text-xs rounded-md border hover:bg-gray-100"
                  >
                    View
                  </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
