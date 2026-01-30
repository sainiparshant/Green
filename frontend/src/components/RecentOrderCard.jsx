import React from "react";

const RecentOrderCard = ({order}) => {

  const isoDate = order.createdAt;

  const formatted = new Date(isoDate).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center p-2  border-b border-gray-300 mb-2">
      
      <div className="flex flex-col">
        <span className="font-semibold text-gray-700 text-xs">
          {order.orderNumber}
        </span>

        <span className="text-xs text-gray-400 mt-1">
          {formatted}
        </span>
      </div>

      
      <div className="flex flex-col items-end">
        <span className="font-semibold text-gray-800 text-md">
          {order.totalAmount}
        </span>

        <span className="text-xs font-medium text-green-600 mt-1">
         {order.orderStatus}
        </span>
      </div>

    </div>
  );
};

export default RecentOrderCard;
