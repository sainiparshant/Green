import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="overflow-hidden">
          <motion.img
            src={product.thumbnail.url}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-3 p-2 md:p-4">
          <div className="flex-1">
            <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              {product.category}
            </p>
            <span className="inline-block mt-1 font-semibold text-sm md:text-lg text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <div className="flex justify-end">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition w-full sm:w-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
