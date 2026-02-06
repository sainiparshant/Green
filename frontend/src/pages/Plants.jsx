import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";
import PlantSection from "../components/ProductSection";
import { LayoutGrid } from "lucide-react";
import API from "../api/axios";
import { useSearchParams } from "react-router-dom";

const Plants = () => {
  
  const [searchParams] = useSearchParams();
  const [plants, setPlants] = useState([]);

  const categoryFromURL = searchParams.get("category");
  const [filters, setFilters] = useState({
    category: categoryFromURL || "",
    price: 2000,
    size: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPlants = async () => {
    try {
      const { data } = await API.get(`/products/all/plants`, {
        params: {
          ...filters,
          page,
          limit: 12,
        },
      });

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
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-gray-100/30">
      <div className="relative w-full h-[20vh] md:h-[40vh] shadow-2xl">
        <img
          src="/hero_photo.jpg"
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

      <div className="max-w-7xl mx-auto flex gap-6 md:px-4  md:px-4 py-5">
        <aside className="hidden lg:block w-72 h-200 bg-white rounded-lg border border-gray-200 p-6">
          <FilterSection
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
                {plants.length} Plants
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
          <PlantSection
            products={plants}
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

export default Plants;
