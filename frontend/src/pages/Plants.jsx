import React from "react";
import FilterSection from "../components/FilterSection";

const Plants = () => {
  return (
    <div className="min-h-screen bg-gray-100/30">
      <div className="relative w-full h-[20vh] md:h-[40vh]">
        <img
          src="/greenhouse.jpg"
          alt="Plant Collection"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-xl md:text-6xl font-semibold text-white leading-tight">
              Our Plant Collection
            </h1>

            <p className="mt-4 text-xs md:text-lg text-gray-200 max-w-2xl">
              Discover our carefully curated selection of plants, from easy-care
              succulents to exotic tropical varieties.
            </p>
          </div>
        </div>
      </div>


        <div>
            <div className=" w-full max-w-sm px-20 py-10">
                <FilterSection/>
            </div>
        </div>

    </div>
  );
};

export default Plants;
