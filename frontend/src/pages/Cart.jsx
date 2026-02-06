import { ShoppingBag } from "lucide-react";
import CartCard from "../components/CartCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCart, priceSummary } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items || []);
  const loading = useSelector((state) => state.cart.cartloading);
  const price = useSelector((state) => state.cart.summary);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      dispatch(priceSummary());
    }
  }, [items, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          
          
          <div className="flex-1">
            {items.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <ShoppingBag className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 text-lg">
                  Your cart is empty
                </p>
                <Link
                  to="/"
                  className="text-emerald-700 mt-3 inline-block font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <CartCard
                    key={item.variantId._id}
                    name={item.productId.name}
                    image={item.productId.thumbnail.url}
                    title={item.productId.title}
                    price={item.variantId.price}
                    quantity={item.quantity}
                    size={item.variantId.size}
                    productId={item.productId._id}
                    variantId={item.variantId._id}
                  />
                ))}
              </div>
            )}
          </div>

          
          {items.length > 0 && (
            <div className="lg:w-96">
              <div className="bg-gray-100 border border-gray-200 p-5 md:p-6 sticky top-6 rounded-xl">
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3 text-sm border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{price.subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      ₹{price.shipping}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span className="font-medium text-gray-900">
                      ₹{price.tax}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">
                    ₹{price.totalAmount}
                  </span>
                </div>

                <Link to="/checkout/address">
                  <button className="mt-6 w-full border border-emerald-600 text-emerald-700 py-2.5 text-sm font-medium hover:bg-emerald-600 hover:text-white transition">
                    Proceed to Checkout
                  </button>
                </Link>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  Inclusive of all taxes. Shipping calculated at checkout.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
