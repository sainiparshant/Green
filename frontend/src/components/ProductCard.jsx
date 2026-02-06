import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth.isAuth);

  const [loading, setLoading] = useState(false);

  const addToCartHandler = async () => {
    if (!auth) {
      navigate("/login");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      await dispatch(
        addItem({ productId: product._id, quantity: 1 })
      ).unwrap();
      toast.success("Item added to cart");
    } catch (error) {
      if (error.statusCode === 401) {
        toast.error("Please login again");
        navigate("/login");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  let productInfo = product.productType;
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    if (product.productType === "Plant") {
      productInfo = product.category;
    } else if (product.productType === "Pot") {
      productInfo = product.potDetails.shape;
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <Link to={`/${product.productType.toLowerCase()}s/${product._id}`}>
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <motion.img
            src={product.thumbnail.url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.08 }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      <div className="p-3 md:p-4 space-y-2">
        <div>
          <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
            {productInfo}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-base md:text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>

          <button
            onClick={addToCartHandler}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
