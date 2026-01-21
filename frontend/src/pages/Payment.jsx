import React, { useEffect, useState } from "react";
import { CreditCard, Wallet, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { priceSummary } from "../redux/cartSlice";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useNavigate} from 'react-router-dom';
// import loadRazorpay from "../helper/loadRazorPay";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    // already loaded
    if (window.Razorpay) {
      console.log("Razorpay already available");
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("Razorpay script loaded");
      resolve(true);
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };

    document.body.appendChild(script);
  });
};



const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const price = useSelector((state) => state.cart.summary);
  const summaryLoading = useSelector(
    (state) => state.cart.summaryLoading
  );

  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    dispatch(priceSummary());
  }, [dispatch]);

  const handlePayment = async() => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "COD") {
      try {
        await API.post("/order/place-order");
        toast.success("Order Placed");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try{
      const isLoaded = await loadRazorpay();
      
      if(!isLoaded){
        toast.error("RazorPay SDK failed to load");
        return;
      }

      const res = await API.post("/payment/create-order");

      const {key, amount, currency, orderId} = res.data.data;

      const options = {
        key,
        amount,
        currency,
        order_id: orderId,
        name:"parshant saini",
        description: "Order Payment",
         handler: async function (response) {
        try {
          
          await API.post("/payment/verify-order", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          toast.success("Payment successful");
          navigate("/orders");
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      theme: {
        color: "#059669",
      },
      }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
      }
      catch(error){
         console.log(error);
         toast.error("Payment failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">

     
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 bg-white border-b shadow-sm">
        <Wallet className="text-emerald-700" size={24} />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Payment
        </h1>
        <ShieldCheck className="text-blue-700" size={24} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 mt-6">

       
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Choose Payment Method
          </h2>

         
          <button
            onClick={() => setPaymentMethod("COD")}
            className={`w-full flex items-center justify-between gap-4 border rounded-xl p-4 mb-4 transition
              ${paymentMethod === "COD"
                ? "border-emerald-600 bg-emerald-50"
                : "hover:border-emerald-400"}
            `}
          >
            <div className="flex items-center gap-4">
              <Truck className="text-emerald-600" size={22} />
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  Cash on Delivery
                </p>
                <p className="text-sm text-gray-500">
                  Pay when your order arrives
                </p>
              </div>
            </div>

            {paymentMethod === "COD" && (
              <CheckCircle className="text-emerald-600" />
            )}
          </button>

         
          <button
            onClick={() => setPaymentMethod("ONLINE")}
            className={`w-full flex items-center justify-between gap-4 border rounded-xl p-4 transition
              ${paymentMethod === "ONLINE"
                ? "border-emerald-600 bg-emerald-50"
                : "hover:border-emerald-400"}
            `}
          >
            <div className="flex items-center gap-4">
              <CreditCard className="text-emerald-600" size={22} />
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  Online Payment
                </p>
                <p className="text-sm text-gray-500">
                  Pay securely using UPI / Card
                </p>
              </div>
            </div>

            {paymentMethod === "ONLINE" && (
              <CheckCircle className="text-emerald-600" />
            )}
          </button>
        </div>

        
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{price.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{price.shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{price.tax}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-gray-900 text-lg">
            <span>Total</span>
            <span>₹{price.totalAmount}</span>
          </div>

         
          <button
            disabled={summaryLoading}
            onClick={handlePayment}
            className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 transition text-white py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {paymentMethod === "COD"
              ? "Place Order"
              : "Pay Now"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            100% secure payments · Easy returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
