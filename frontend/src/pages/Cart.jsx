import { ShoppingBag } from "lucide-react";
import CartCard from "../components/CartCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCart, selectSubTotal } from "../redux/cartSlice";

const Cart = () => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);
  const loading = useSelector((state) => state.cart.loading);
  const Subtotal = useSelector(selectSubTotal);
  const shipping = 60;
  const tax = 0.18 * Subtotal;
  const totalAmount = Math.round((Subtotal + shipping + tax) *100) / 100;

  useEffect(() =>{
    dispatch(getCart());
  },[dispatch]);

    if(loading){
      return <div className="flex items-center min-h-screen mx-auto justify-center"><Loader /></div>;
    }

 return (
  <div className="min-h-screen bg-gray-50 pb-24">
    
    
    <div className="flex items-center justify-between gap-2 sm:gap-3 px-4 py-5 bg-white border-b border-gray-200 shadow-sm">
      <Link to="/">
        <h1 className="text-emerald-700 hover:text-emerald-900 transition font-bold "  >
          Home
        </h1>
      </Link>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
        Shopping Cart
      </h1>

      <Link to="/checkout/cart">
        <ShoppingBag className="text-blue-700 hover:text-blue-900 transition" size={24} />
      </Link>
    </div>

    <div className="max-w-7xl mx-auto px-3 md:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

        
        <div className="flex-1">

          {items.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
              <p className="text-gray-500 text-lg">
                Your cart is empty
              </p>
              <Link to="/" className="text-emerald-700 mt-3 inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartCard
                  key={item._id}
                  name={item.productId.name}
                  image={item.productId.thumbnail.url}
                  title={item.productId.title}
                  price={item.productId.price}
                  quantity={item.quantity}
                  size={item.productId.size}
                  productId={item.productId._id}
                />
              ))}
            </div>
          )}

        </div>

        
        <div className="lg:w-96">
          <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 sticky top-6">

            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Order Summary
            </h2>

            <div className="mt-5 border-b border-gray-200 pb-4 space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{Subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">₹{shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-medium">₹{tax.toFixed(2)}</span>
              </div>

            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="font-semibold text-lg">
                Total Amount
              </span>
              <span className="font-semibold text-lg text-emerald-800">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-emerald-700 hover:bg-emerald-800 transition p-3 rounded-lg mt-6 text-white font-medium"
            >
              Proceed to Checkout
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Taxes included. Shipping calculated at checkout.
            </p>

          </div>
        </div>

      </div>
    </div>
  </div>
);

};

export default Cart;
