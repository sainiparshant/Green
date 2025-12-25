import React from "react";

const FilterSection = ({ filters, setFilters, setPage }) => {

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setPage(1);
  };

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-lg font-medium mb-4">Filters</h1>
        <hr className="text-gray-400" />
      </div>

      
      <div className="mt-5 font-medium">
        <h1 className="text-md font-semibold mb-4">Category</h1>

        {[
          "Outdoor",
          "Indoor",
          "Flower",
          "Medicinal",
          "Bonsai",
          "Herbal",
          "Succulent",
        ].map(cat => (
          <label key={cat} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              name="category"
              className="w-4"
              value={cat}
              checked={filters.category === cat}
              onChange={e => handleChange("category", e.target.value)}
            />
            {cat}
          </label>
        ))}
      </div>

      <br />
      <hr className="text-gray-400" />

      
      <div className="mt-5 font-medium">
        <h1 className="text-md font-semibold mb-4">Price Range</h1>

        <div className="flex flex-col gap-3">
          <input
            type="range"
            id="price"
            min={100}
            max={2000}
            value={filters.price}
            onChange={e => handleChange("price", Number(e.target.value))}
          />
          <label htmlFor="price">Up to ₹{filters.price}</label>
        </div>
      </div>

      <br />
      <hr className="text-gray-400" />

      
      <div className="mt-5 font-medium">
        <h1 className="text-md font-semibold mb-4">Size</h1>

        {["small", "medium", "large"].map(size => (
          <label key={size} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              name="size"
              className="w-4"
              value={size}
              checked={filters.size === size}
              onChange={e => handleChange("size", e.target.value)}
            />
            {size}
          </label>
        ))}
      </div>

      <br />
    </div>
  );
};

export default FilterSection;
