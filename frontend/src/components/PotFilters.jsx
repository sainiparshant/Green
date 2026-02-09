import React from "react";
import { X } from "lucide-react";

const PotFilters = ({ filters, setFilters, setPage, isMobile = false }) => {

  const handleShapeChange = (shape) => {
    setFilters(prev => {
      const currentShapes = Array.isArray(prev.shape) 
        ? prev.shape 
        : prev.shape ? [prev.shape] : [];
      const isSelected = currentShapes.includes(shape);
      
      return {
        ...prev,
        shape: isSelected
          ? currentShapes.filter(s => s !== shape)
          : [...currentShapes, shape]
      };
    });
    setPage(1);
  };

  const handleMaterialChange = (material) => {
    setFilters(prev => {
      const currentMaterials = Array.isArray(prev.material) 
        ? prev.material 
        : prev.material ? [prev.material] : [];
      const isSelected = currentMaterials.includes(material);
      
      return {
        ...prev,
        material: isSelected
          ? currentMaterials.filter(m => m !== material)
          : [...currentMaterials, material]
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
      shape: [],
      price: 2000,
      size: [],
      material: [],
    });
    setPage(1);
  };

  // Normalize filters to arrays for display
  const shapeArray = Array.isArray(filters.shape) 
    ? filters.shape 
    : filters.shape ? [filters.shape] : [];
  
  const materialArray = Array.isArray(filters.material) 
    ? filters.material 
    : filters.material ? [filters.material] : [];
  
  const sizeArray = Array.isArray(filters.size) 
    ? filters.size 
    : filters.size ? [filters.size] : [];

  const hasActiveFilters =
    shapeArray.length > 0 ||
    sizeArray.length > 0 ||
    materialArray.length > 0 ||
    filters.price !== 2000;

  return (
    <div className={isMobile ? "max-h-[70vh] overflow-y-auto" : "h-fit max-h-[calc(100vh-200px)] overflow-y-auto pr-2"}>
      {/* Header with Clear All */}
      <div className={`flex items-center justify-between mb-4 ${!isMobile && 'sticky top-0 bg-white pb-2 z-10'}`}>
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

      {/* Shape Filter */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">
            Shape
            {shapeArray.length > 0 && (
              <span className="ml-2 text-xs text-emerald-600 font-normal">
                ({shapeArray.length})
              </span>
            )}
          </h2>
          {shapeArray.length > 0 && (
            <button
              onClick={() => clearFilter("shape")}
              className="text-xs text-gray-500 hover:text-emerald-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2">
          {["round", "square", "rectangular", "cylindrical", "conical", "bowl", "oval", "hexagon", "pedestal", "hanging"].map((shap) => (
            <label
              key={shap}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors capitalize ${
                shapeArray.includes(shap)
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={shapeArray.includes(shap)}
                onChange={() => handleShapeChange(shap)}
              />
              <span className="text-sm">{shap}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-gray-400 mb-4" />

      {/* Price Range Filter */}
      <div className="mb-5">
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
            onChange={(e) => handlePriceChange(Number(e.target.value))}
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

      {/* Material Filter */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">
            Material
            {materialArray.length > 0 && (
              <span className="ml-2 text-xs text-emerald-600 font-normal">
                ({materialArray.length})
              </span>
            )}
          </h2>
          {materialArray.length > 0 && (
            <button
              onClick={() => clearFilter("material")}
              className="text-xs text-gray-500 hover:text-emerald-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2">
          {["plastic", "cement", "metal"].map((material) => (
            <label
              key={material}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors capitalize ${
                materialArray.includes(material)
                  ? "bg-emerald-50 text-emerald-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={materialArray.includes(material)}
                onChange={() => handleMaterialChange(material)}
              />
              <span className="text-sm">{material}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="text-gray-400 mb-4" />

      {/* Size Filter */}
      <div className="mb-5">
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

        <div className="space-y-2">
          {["small", "medium", "large"].map((size) => (
            <label
              key={size}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors capitalize ${
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
            {shapeArray.map(shape => (
              <span 
                key={shape}
                className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs border border-emerald-200 capitalize"
              >
                {shape}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleShapeChange(shape)}
                />
              </span>
            ))}
            {materialArray.map(material => (
              <span 
                key={material}
                className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs border border-emerald-200 capitalize"
              >
                {material}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleMaterialChange(material)}
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

export default PotFilters;
