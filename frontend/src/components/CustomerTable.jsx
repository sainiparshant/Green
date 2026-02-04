import React from "react";
import { Eye, Phone, Mail } from "lucide-react";

const CustomerTable = ({ customers, onView }) => {
  return (
    <div className="bg-white rounded-xl border overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-4 font-medium">Customer Name</th>
            <th className="px-6 py-4 font-medium">Phone</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium text-center">Total Orders</th>
            <th className="px-6 py-4 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {customers.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-6 text-center text-gray-500">
                No customers found
              </td>
            </tr>
          )}

          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">
                {customer.name}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Phone size={14} />
                  <span className="text-gray-700">
                    {customer.phone || "-"}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Mail size={14} />
                  <span className="text-gray-700">
                    {customer.email}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 text-center font-semibold">
                {customer.ordersCount}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onView?.(customer._id)}
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-emerald-600"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
