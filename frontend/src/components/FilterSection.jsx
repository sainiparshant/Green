import React from "react";
import { X } from "lucide-react";

const FilterSection = ({ filters, setFilters, setPage, isMobile = false }) => {

  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const currentCategories = Array.isArray(prev.category) 
        ? prev.category 
        : prev.category ? [prev.category] : [];
      const isSelected = currentCategories.includes(category);
      
      return {
        ...prev,
        category: isSelected
          ? currentCategories.filter(cat => cat !== category)
          : [...currentCategories, category]
      };
    });
    setPage(1);
  };

  const handleSizeChange = (size) => {
    setFilters(prev => {
      const currentSizes = Array.isArray(prev.size) 
        ? prev.size 
        : prev.size ? [prev.size] : [];
      const isSelected = currentSizes.includes(size);
      
      return {
        ...prev,
        size: isSelected
          ? currentSizes.filter(s => s !== size)
          : [...currentSizes, size]
      };
    });
    setPage(1);
  };

  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      price: value
    }));
    setPage(1);
  };

  const clearFilter = (field) => {
    setFilters(prev => ({
      ...prev,
      [field]: field === "price" ? 2000 : []
    }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      price: 2000,
      size: [],
    });
    setPage(1);
  };

  // Normalize filters to arrays for display
  const categoryArray = Array.isArray(filters.category) 
    ? filters.category 
    : filters.category ? [filters.category] : [];
  
  const sizeArray = Array.isArray(filters.size) 
    ? filters.size 
    : filters.size ? [filters.size] : [];

  const hasActiveFilters = 
    categoryArray.length > 0 || 
    sizeArray.length > 0 || 
    filters.price !== 2000;

  return (
    <div className={isMobile ? "max-h-[100vh] overflow-y-auto" : "h-fit min-h-[100vh]  lg:pr-2"}>
      {/* Header with Clear All - Only show on desktop */}
      {!isMobile && (
        <>
          <div className="flex items-center justify-between mb-4 sticky top-0 pb-2 z-10">
            <h1 className="text-base md:text-lg font-semibold">Filters</h1>
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
          <hr className="text-gray-400 mb-4" />
        </>
      )}

      {/* Mobile - Only Clear All button */}
      {isMobile && hasActiveFilters && (
        <>
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={clearAllFilters}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </button>
          </div>
          <hr className="text-gray-400 mb-4" />
        </>
      )}

      {/* Category Filter */}
      <div className="mb-1">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold">
            Category
            {categoryArray.length > 0 && (
              <span className="ml-2 text-xs text-emerald-600 font-normal">
                ({categoryArray.length})
              </span>
            )}
          </h2>
          {categoryArray.length > 0 && (
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
                categoryArray.includes(cat)
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={categoryArray.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-gray-400 mb-4" />

      {/* Price Range Filter */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
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

        <div className="">
          <input
            type="range"
            id="price"
            min={100}
            max={2000}
            step={50}
            value={filters.price}
            onChange={e => handlePriceChange(Number(e.target.value))}
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

      <hr className="text-gray-400 mb-4" />

      {/* Size Filter */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">
            Size
            {sizeArray.length > 0 && (
              <span className="ml-2 text-xs text-emerald-600 font-normal">
                ({sizeArray.length})
              </span>
            )}
          </h2>
          {sizeArray.length > 0 && (
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
                sizeArray.includes(size)
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={sizeArray.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <p className="text-xs font-semibold text-emerald-700 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {categoryArray.map(cat => (
              <span 
                key={cat}
                className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs border border-emerald-200"
              >
                {cat}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleCategoryChange(cat)}
                />
              </span>
            ))}
            {sizeArray.map(size => (
              <span 
                key={size}
                className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs capitalize border border-emerald-200"
              >
                {size}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleSizeChange(size)}
                />
              </span>
            ))}
            {filters.price !== 2000 && (
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs border border-emerald-200">
                Up to ₹{filters.price}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => clearFilter("price")}
                />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
