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
    <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2">
      {/* Header with Clear All */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 z-10">
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

      {/* Category Filter */}
      <div className="mb-6">
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

        <div className="space-y-2">
          {["Outdoor", "Indoor", "Flower", "Medicinal", "Bonsai", "Herbal", "Succulent"].map(cat => (
            <label
              key={cat}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
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

      <hr className="text-gray-400 mb-5" />

      {/* Price Range Filter */}
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

      <hr className="text-gray-400 mb-5" />

      {/* Size Filter */}
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

        <div className="space-y-2">
          {["small", "medium", "large"].map(size => (
            <label
              key={size}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors capitalize ${
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

      {/* Active Filters Summary */}
      {/* {hasActiveFilters && (
        <div className="mt-6 p-3 bg-emerald-50 rounded-lg">
          <p className="text-xs font-semibold text-emerald-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                {filters.category}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => clearFilter("category")}
                />
              </span>
            )}
            {filters.size && (
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs capitalize">
                {filters.size}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => clearFilter("size")}
                />
              </span>
            )}
            {filters.price !== 2000 && (
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs">
                ₹{filters.price}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => clearFilter("price")}
                />
              </span>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FilterSection;
