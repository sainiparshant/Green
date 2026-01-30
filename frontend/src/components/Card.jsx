import React from "react";

const Card = ({ title, icon, quantity }) => {
  return (
    <div className="bg-white rounded-xl  border border-gray-300 p-3 md:p-4 shadow-md">

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        {icon}
      </div>
      <br />
      <h1 className="text-xl font-bold text-gray-800 mt-1">{quantity}</h1>
    </div>
  );
};

export default Card;
