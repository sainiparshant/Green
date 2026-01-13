import { Trash2 } from "lucide-react";
import React from "react";

const CartCard = ({ image, name, title, price, quantity, size ,category="indoor"}) => {
  return (
    <div className="bg-white flex md:mb-2 p-4 md:p-6 border-b border-gray-300 md:rounded">

      <div className="flex gap-4 flex-1">
        <img
          src={image}
          alt={name}
          className="w-22 h-25  sm:w-30 sm:h-30 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-2">
          
            <h2 className="font-semibold text-sm sm:text-lg text-gray-900 line-clamp-1">
              {name}
            </h2>
            <p className="italic text-xs sm:text-sm text-gray-500 line-clamp-1">
              {title}
            </p>

           <div className="flex gap-4">
            <span className="bg-gray-200 text-xs rounded p-1 ">{size}</span>
            <span className="bg-gray-200 text-xs rounded p-1 ">{category}</span>
           </div>
          

          <p className="font-semibold text-sm sm:text-base text-emerald-700">
            ₹{price}
          </p>
        </div>

      </div>

      <div className="flex flex-col items-end  justify-between gap-3 sm:gap-2">

        <button className="text-gray-400 hover:text-red-500 cursor-pointer">
          <Trash2 size={18} />
        </button>

        <div className="flex items-center border rounded-lg px-2 py-1">
          <button className="px-2 text-sm">−</button>
          <span className="px-2 text-sm font-medium">{quantity}</span>
          <button className="px-2 text-sm">+</button>
        </div>

      </div>

      
    </div>
  );
};

export default CartCard;
