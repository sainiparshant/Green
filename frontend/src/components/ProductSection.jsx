import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Loader } from "./Loader";
import { ArrowBigLeft, Maximize } from "lucide-react";

const ProductSection = ({products, loading, totalPages, page, setPage}) => {
  

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <Loader />
      </div>
    );
  }

  
  return (
    <div className="py-2 px-2">

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-10  md:mt-20">
        {[...Array(totalPages)].map((_, index) => (
          
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-full text-sm border
        ${
          page === index + 1
            ? "bg-emerald-600 text-white"
            : "bg-white hover:bg-gray-100"
        }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
