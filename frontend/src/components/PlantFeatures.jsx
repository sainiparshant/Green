import React from "react";

const PlantFeatures = ({icon, title, subtitle}) => {
  return (
    <div>
      <div className="flex flex-col gap-1 items-center">
        <div className="bg-gray-200 rounded-full p-1">
          {icon}
        </div>
        <h1 className="md:font-semibold font-medium text-sm md:text-md">{title}</h1>
        <p className="p text-xs md:text-sm font-medium">{subtitle}</p>
      </div>
    </div>
  );
};

export default PlantFeatures;
