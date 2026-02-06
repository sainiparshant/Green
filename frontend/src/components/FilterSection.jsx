import React from "react";
import { X } from "lucide-react";

const FilterSection = ({ filters, setFilters, setPage }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPage(1);
  };

  const clearFilter = (field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: field === "price" ? 2000 : "",
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

  const hasActiveFilters =
    filters.category !== "" ||
    filters.size !== "" ||
    filters.price !== 2000;

  return (
    <div className="h-[calc(100vh)]  pr-2">
      
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

      <hr className="text-gray-300 mb-4" />

      {/* Category */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
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

        {[
          "Outdoor",
          "Indoor",
          "Flower",
          "Medicinal",
          "Bonsai",
          "Herbal",
          "Succulent",
        ].map((cat) => (
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
              checked={filters.category === cat}
              onChange={(e) =>
                e.target.checked
                  ? handleChange("category", cat)
                  : clearFilter("category")
              }
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span className="text-sm">{cat}</span>
          </label>
        ))}
      </div>

      <hr className="text-gray-300 mb-4" />

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
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

        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          value={filters.price}
          onChange={(e) =>
            handleChange("price", Number(e.target.value))
          }
          className="w-full accent-emerald-600"
        />

        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>₹100</span>
          <span className="font-semibold text-emerald-600">
            Up to ₹{filters.price}
          </span>
          <span>₹2000</span>
        </div>
      </div>

      <hr className="text-gray-300 mb-4" />

      {/* Size */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
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

        {["small", "medium", "large"].map((size) => (
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
              checked={filters.size === size}
              onChange={(e) =>
                e.target.checked
                  ? handleChange("size", size)
                  : clearFilter("size")
              }
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <span className="text-sm">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
