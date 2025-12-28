import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, productInfo }) => {
  return (
    <Link to={`/${product.productType.toLowerCase()}s/${product._id}`}>
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white mt-2 md:mt-5">

        
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <motion.img
            src={product.thumbnail.url}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

       
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 md:p-4">

          <div className="flex-1">
            <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-900 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs md:text-sm text-gray-500 line-clamp-1 md:line-clamp-2">
              {productInfo}
            </p>

            <span className="inline-block mt-1 font-semibold text-sm md:text-lg text-gray-900">
              ₹{product.price}
            </span>
          </div>

          <div className="flex justify-end">
            <button className="bg-emerald-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm hover:bg-emerald-700 transition w-full sm:w-auto">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
