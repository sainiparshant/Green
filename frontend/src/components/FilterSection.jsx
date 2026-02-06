import React from "react";
import { X } from "lucide-react";

const FilterSection = ({ filters, setFilters, setPage }) => {

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setPage(1);
  };

  const clearFilter = (field) => {
    setFilters(prev => ({
      ...prev,
      [field]: field === "price" ? 2000 : ""
    }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      price: 2000,
      size: "",
    });
    setPage(1);
  };

  const hasActiveFilters = filters.category !== "" || filters.size !== "" || filters.price !== 2000;

  return (
    <div className="pr-2 w-56">
      
      <div className="flex items-center justify-between mb-4 sticky top-0  pb-2 z-10">
        <h1 className="text-lg font-semibold">Filters</h1>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>
      <hr className="text-gray-400 mb-5" />

      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Category</h2>
          {filters.category && (
            <button
              onClick={() => clearFilter("category")}
              className="text-xs text-gray-500 hover:text-emerald-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="">
          {["Outdoor", "Indoor", "Flower", "Medicinal", "Bonsai", "Herbal", "Succulent"].map(cat => (
            <label
              key={cat}
              className={`flex items-center gap-3 cursor-pointer p-1 rounded-lg transition-colors ${
                filters.category === cat
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={filters.category === cat}
                onChange={e => {
                  if (e.target.checked) {
                    handleChange("category", cat);
                  } else {
                    clearFilter("category");
                  }
                }}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-gray-400 mb-3" />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Price Range</h2>
          {filters.price !== 2000 && (
            <button
              onClick={() => clearFilter("price")}
              className="text-xs text-gray-500 hover:text-emerald-600"
            >
              Reset
            </button>
          )}
        </div>

        <div className="space-y-3">
          <input
            type="range"
            id="price"
            min={100}
            max={2000}
            step={50}
            value={filters.price}
            onChange={e => handleChange("price", Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>₹100</span>
            <span className="font-semibold text-emerald-600 text-sm">
              Up to ₹{filters.price}
            </span>
            <span>₹2000</span>
          </div>
        </div>
      </div>

      <hr className="text-gray-400 mb-3" />

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Size</h2>
          {filters.size && (
            <button
              onClick={() => clearFilter("size")}
              className="text-xs text-gray-500 hover:text-emerald-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="">
          {["small", "medium", "large"].map(size => (
            <label
              key={size}
              className={`flex items-center gap-3 cursor-pointer p-1 rounded-lg transition-colors capitalize ${
                filters.size === size
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={filters.size === size}
                onChange={e => {
                  if (e.target.checked) {
                    handleChange("size", size);
                  } else {
                    clearFilter("size");
                  }
                }}
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterSection;
