import {
  ArrowLeft,
  Package,
  User,
  CreditCard,
  Calendar,
  Truck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/axios";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");

  const [saving, setSaving] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  const orderDetails = async (id) => {
    try {
      const { data } = await API.get(`/admin/order/${id}`);
      const orderData = data.data[0];

      setOrder(orderData);
      setSelectedStatus(orderData.orderStatus);
      setSelectedPaymentStatus(orderData.paymentStatus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderDetails(id);
  }, [id]);

  const handleStatusChange = async () => {
    try {
      setSaving(true);

      const { data } = await API.patch(`/admin/order/status/${id}`, {
        orderStatus: selectedStatus,
      });

      setOrder((prev) => ({
        ...prev,
        ...data.data,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentStatusChange = async () => {
    try {
      setSavingPayment(true);

      const { data } = await API.patch(`/admin/order/payment-status/${id}`, {
        paymentStatus: selectedPaymentStatus,
      });

      setOrder((prev) => ({
        ...prev,
        ...data.data,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setSavingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>

        {/* Header */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {order.orderNumber}
              </h1>

              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <Calendar size={16} />
                <p className="text-sm">
                  {order.createdAt &&
                    new Date(order.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <StatusBadge status={order.orderStatus} />
              <PaymentBadge status={order.paymentStatus} />
            </div>
          </div>
        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">
            {/* Customer */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <User size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Customer Information
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Name
                  </p>
                  <p className="text-gray-900 font-medium">
                    {order.user_detail?.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-gray-900">{order.user_detail?.email}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <Package size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h2>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      Product
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side */}

          <div className="space-y-6">
            {/* Update Order Status */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold">Update Status</h2>
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>pending</option>
                <option>processing</option>
                <option>shipped</option>
                <option>delivered</option>
                <option>cancelled</option>
              </select>

              <button
                onClick={handleStatusChange}
                disabled={saving || selectedStatus === order.orderStatus}
                className={`w-full mt-4 py-3 rounded-lg ${
                  saving || selectedStatus === order.orderStatus
                    ? "bg-gray-300"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {saving ? "Saving..." : "Save Status"}
              </button>
            </div>

            {/* Update Payment Status */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold">Update Payment</h2>
              </div>

              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="failed">failed</option>
              </select>

              <button
                onClick={handlePaymentStatusChange}
                disabled={
                  savingPayment ||
                  selectedPaymentStatus === order.paymentStatus
                }
                className={`w-full mt-4 py-3 rounded-lg ${
                  savingPayment ||
                  selectedPaymentStatus === order.paymentStatus
                    ? "bg-gray-300"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {savingPayment ? "Saving..." : "Save Payment"}
              </button>
            </div>

            {/* Order Summary */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>

              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="font-semibold">${order.totalAmount}</span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Payment Method
                </p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => (
  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
    {status}
  </span>
);

const PaymentBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs ${
      status === "paid"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status}
  </span>
);

export default OrderDetail;