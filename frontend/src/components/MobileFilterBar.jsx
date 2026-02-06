import React from "react";

const MobileFilterBar = ({ filters, setFilters, setPage }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPage(1);
  };

  return (
    <div className="lg:hidden w-full bg-white border-b border-gray-200 px-3 py-3 sticky top-0 z-20">
      <div className="flex gap-2 justify-between overflow-x-auto">

       
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="min-w-[140px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
        >
          <option value="">Category</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Indoor">Indoor</option>
          <option value="Flower">Flower</option>
          <option value="Medicinal">Medicinal</option>
          <option value="Bonsai">Bonsai</option>
          <option value="Herbal">Herbal</option>
          <option value="Succulent">Succulent</option>
        </select>

        
        <select
          value={filters.size}
          onChange={(e) => handleChange("size", e.target.value)}
          className="min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none capitalize"
        >
          <option value="">Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

       
        <select
          value={filters.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
        >
          <option value={2000}>Price</option>
          <option value={500}>Up to ₹500</option>
          <option value={1000}>Up to ₹1000</option>
          <option value={1500}>Up to ₹1500</option>
          <option value={2000}>Up to ₹2000</option>
        </select>

      </div>
    </div>
  );
};

export default MobileFilterBar;
