import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";
import { LayoutGrid } from "lucide-react";
import API from "../api/axios";
import ProductSection from "../components/ProductSection";
import PotFilters from "../components/PotFilters";

const Pots = () => {
  const [pots, setPots] = useState([]);
  const [filters, setFilters] = useState({
    shape: "",
    price: 2000,
    size: "",
    material: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPots = async () => {
    try {
      const { data } = await API.get(`/products/all/pots`, {
        params: {
          ...filters,
          page,
          limit: 9,
        },
      });

      setPots(data.data.docs);

      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPots();
  }, [page, filters]);

  return (
    <div className="min-h-screen bg-gray-100/30">
      <div className="relative w-full h-[20vh] md:h-[40vh] shadow-2xl">
        <img
          src="/pots_collection.jpg"
          alt="Pot Collection"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-xl md:text-6xl font-semibold text-white leading-tight">
              Our Pot Collection
            </h1>

            <p className="mt-4 text-xs md:text-lg text-gray-200 max-w-2xl">
             Explore our thoughtfully designed plant pots, made to complement your décor while giving your plants a beautiful, cozy home.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex gap-6 md:px-4  md:px-4 py-5">
        <aside className="hidden lg:block w-72 h-200 bg-white rounded-lg border border-gray-200 p-6">
          <PotFilters
            filters={filters}
            setFilters={setFilters}
            setPage={setPage}
          />
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 px-2">
              <LayoutGrid className="w-4 h-4 sm:w-6 sm:h-6" />
              <p className="text-xs md:text-sm font-semibold">
                {pots.length} Pots
              </p>
            </div>
             
            {/* <div className="flex items-center gap-1">
              <label
                htmlFor="sortBy"
                className="text-sm md:text-xs font-medium text-gray-600"
              >
                Sort by
              </label>

              <select
                id="sortBy"
                name="sort"
                className="bg-white border border-gray-300 
               text-base md:text-sm 
               text-gray-700 rounded-lg 
               px-3 py-2
               outline-none cursor-pointer"
              >
                <option value="name-asc">Name (A–Z)</option>
                <option value="price-asc">Price (Low → High)</option>
                <option value="price-desc">Price (High → Low)</option>
              </select>
            </div> */}
          </div>
          <ProductSection
            products={pots}
            totalPages={totalPages}
            loading={loading}
            page={page}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
};

export default Pots;
