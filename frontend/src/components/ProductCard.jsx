import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductCard = ({ product }) => {
  const location = useLocation();

  let productInfo = product.productType;
  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    if (product.productType === "Plant") {
      productInfo = product.category;
    } else if (product.productType === "Pot") {
      productInfo = product.shape;
    }
  }

  return (
    <Link
      to={`/${product.productType.toLowerCase()}s/${product._id}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <motion.img
          src={product.thumbnail.url}
          alt={product.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-3 md:p-4 space-y-1.5">
        <span className="inline-block rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
          {product.productType === "Plant" ? product.careLevel : product.material}
        </span>

        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
          {productInfo}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-base md:text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>

          {/* <button
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 
             text-sm md:text-base font-semibold text-white 
             hover:bg-emerald-700 transition-all"
          >
            View
            <span className="text-lg leading-none">→</span>
          </button> */}

          <button
            className="flex items-center justify-center gap-1 md:gap-2 
                       rounded-lg md:rounded-xl 
                       bg-emerald-600 
                       px-3 py-2 md:px-5 md:py-2.5
                       text-xs md:text-sm font-semibold text-white 
                       hover:bg-emerald-700 
                       active:scale-95
                       transition-all duration-200
                       shadow-md hover:shadow-lg
                       group-hover:translate-x-1"
          >
            View
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
