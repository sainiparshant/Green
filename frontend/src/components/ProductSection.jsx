import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Loader } from "./Loader";

const ProductSection = ({ products, loading, totalPages, page, setPage }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-2 px-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-16">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-sm rounded-md border 
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-gray-100"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = page === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 text-sm rounded-md border transition
          ${
            isActive
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white hover:bg-gray-100"
          }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 text-sm rounded-md border 
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
