import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating = 0 }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "text-emerald-800 fill-emerald-800"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

export default StarRating;
