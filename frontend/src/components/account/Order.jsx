import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import API from '../../api/axios'

const Order = () => {
  const [open, setOpen] = useState(false);
  const [orders , setOrders] = useState([]);
  const [selectedOrderId , setSelectedOrderId] = useState(null);

  const getOrders = async() =>{
    try {
      const res = await API.get("/order/all");
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() =>{
    getOrders();
  },[]);

  return (
    <div className="max-w-4xl">

      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        My Orders
      </h2>

      <div className="space-y-4">

        {orders.map((order) => (
          <OrderCard setOpen={setOpen} key={order._id} order={order}  
          onView={(orderId) => {
          setSelectedOrderId(orderId);
          setOpen(true);
          }}/>
        ))}

      </div>

      {open && selectedOrderId && (
  <OrderDetails
    orderId={selectedOrderId}
    onClose={() => {
      setOpen(false);
      setSelectedOrderId(null);
    }}
  />
)}


    </div>
  );
};

const OrderDetails = ({ orderId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/order/${orderId}`);
        setOrder(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">Loading...</div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">

        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        
        <h3 className="text-xl font-semibold mb-1">
          Order Details
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Order #{order.orderNumber}
        </p>

        
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
            {order.orderStatus}
          </span>

          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            {order.paymentMethod === "COD"
              ? "Cash on Delivery"
              : "Online Payment"}
          </span>
        </div>

       
        <div className="border rounded-lg p-4 mb-6">
          <h4 className="font-medium mb-2 text-gray-900">
            Delivery Address
          </h4>

          <p className="text-sm text-gray-700">
            <span className="font-medium">
              {order.shippingAddress.fullName}
            </span>{" "}
            ({order.shippingAddress.phone})
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.state} – {order.shippingAddress.pinCode}
          </p>
        </div>

        
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900">
            Items
          </h4>

          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.productId.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="border-t pt-4 space-y-2 text-sm">
         <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

        </div>

      </div>
    </div>
  );
};



export default Order;
