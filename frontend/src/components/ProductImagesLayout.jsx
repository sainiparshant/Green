import React from "react";

const ProductImagesLayout = ({ images = [], activeImage, setActiveImage }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2 md:gap-3 md:w-24">
        {images.map((img) => (
          <button
            key={img._id}
            onClick={() => setActiveImage(img.url)}
            className={`w-20 h-20 rounded-lg overflow-hidden border transition
              ${
                activeImage === img.url
                  ? "border-emerald-500 ring-1 ring-emerald-400"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 flex-1">
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
          <img
            src={activeImage}
            alt="Product"
            className="w-full h-full object-cover transition duration-300"
          />
        </div>
      </div>

    </div>
  );
};

export default ProductImagesLayout;
