import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";
import PlantSection from "../components/PlantSection";
import { LayoutGrid } from "lucide-react";
import API from '../api/axios'

const Plants = () => {

  const [plants, setPlants] = useState([]);
  const [filters, setFilters] = useState({
    category:"",
    price:2000,
    size:""
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPlants = async () => {
    try {
      const { data } = await API.get(
        `/products/all/plants`, {
          params: {
            ...filters,
            page,
            limit:9
          }}
      );

      setPlants(data.data.docs);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [page, filters]);

  return (
    <div className="min-h-screen bg-gray-100/30">
      <div className="relative w-full h-[20vh] md:h-[40vh] shadow-2xl">
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

      <div className="max-w-7xl mx-auto flex gap-6 px-4 md:px-4 py-10">
        <aside className="hidden lg:block w-72 h-200 bg-white rounded-lg border border-gray-200 p-6">
          <FilterSection filters={filters} setFilters={setFilters} setPage={setPage}  />
        </aside>

        <main className="flex-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <LayoutGrid />
                <p className="text-sm font-semibold">10 Plants</p>
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="sortBy"
                  className="text-sm font-medium text-gray-600"
                >
                  Sort by
                </label>

                <select
                  id="sortBy"
                  name="sort"
                  className="bg-white border border-gray-300 text-sm text-gray-700  rounded-lg px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>
            </div>
          <PlantSection plants={plants} totalPages={totalPages} loading={loading} page={page} setPage={setPage}/>
        </main>
      </div>
    </div>
  );
};

export default Plants;
