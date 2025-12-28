import React from "react";

const PotFilters = ({ filters, setFilters, setPage }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
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
        <h1 className="text-md font-semibold mb-4">Shape</h1>

        {[
          "round",
          "square",
          "rectangular",
          "cylindrical",
          "conical",
          "bowl",
          "oval",
          "hexagon",
          "pedestal",
          "hanging",
        ].map((shap) => (
          <label key={shap} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              name="shape"
              className="w-4"
              value={shap}
              checked={filters.shape === shap}
              onChange={(e) => handleChange("shape", e.target.value)}
            />
            {shap}
          </label>
        ))}
      </div>

      <br />
      <hr className="text-gray-400" />

      <div className="mt-2 font-medium">
        <h1 className="text-md font-semibold mb-4">Price Range</h1>

        <div className="flex flex-col gap-3">
          <input
            type="range"
            id="price"
            min={100}
            max={2000}
            value={filters.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />
          <label htmlFor="price">Up to ₹{filters.price}</label>
        </div>
      </div>

      <br />
      <hr className="text-gray-400" />

        <div className="mt-2 font-medium">
        <h1 className="text-md font-semibold mb-2">Material</h1>

        {["plastic", "cement", "metal"].map((material) => (
          <label key={material} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              name="material"
              className="w-4"
              value={material}
              checked={filters.material === material}
              onChange={(e) => handleChange("material", e.target.value)}
            />
            {material}
          </label>
        ))}
      </div>
      <br />
      <hr className="text-gray-400" />

      <div className="mt-2 font-medium">
        <h1 className="text-md font-semibold mb-2">Size</h1>

        {["small", "medium", "large"].map((size) => (
          <label key={size} className="flex gap-3 cursor-pointer">
            <input
              type="radio"
              name="size"
              className="w-4"
              value={size}
              checked={filters.size === size}
              onChange={(e) => handleChange("size", e.target.value)}
            />
            {size}
          </label>
        ))}
      </div>

      <br />
    </div>
  );
};

export default PotFilters;
