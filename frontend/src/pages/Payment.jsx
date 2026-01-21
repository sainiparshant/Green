import React, { useEffect } from "react";
import { CreditCard, Wallet, Truck, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { priceSummary } from "../redux/cartSlice";

const Payment = () => {

  const dispatch = useDispatch();
  const price = useSelector((state) => state.cart.summary);

  useEffect(() =>{
    dispatch(priceSummary());
  },[dispatch]);

  return (
    <div className=" min-h-screen pb-24">

      <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-gray-200 mb-4">
        <Wallet className="text-emerald-800" size={22} />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Payment
        </h1>
        <ShieldCheck className="text-blue-800" size={22} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6">

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-4">

          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Select Payment Method
          </h2>

          <label className="flex items-center gap-3 border rounded-lg p-4 mb-3 cursor-pointer hover:border-emerald-600">
            <input
              type="radio"
              name="payment"
              className="accent-emerald-600"
            />
            <Truck className="text-emerald-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Cash on Delivery</p>
              <p className="text-sm text-gray-500">
                Pay when your order arrives
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-emerald-600">
            <input
              type="radio"
              name="payment"
              className="accent-emerald-600"
            />
            <CreditCard className="text-emerald-600"  size={20} />
            <div>
              <p className="font-medium text-gray-900">
                Online Payment
              </p>
              <p className="text-sm text-gray-500">
                Pay securely
              </p>
            </div>
          </label>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 h-fit">

          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{price.subtotal}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Shipping</span>
            <span>₹{price.shipping}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Tax</span>
            <span>₹{price.tax}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>₹{price.totalAmount}</span>
          </div>

        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-white shadow-md">
        <button className="bg-emerald-600 text-white w-full py-3 rounded-lg text-sm font-medium hover:bg-emerald-700">
          Place Order
        </button>
      </div>

    </div>
  );
};

export default Payment;
