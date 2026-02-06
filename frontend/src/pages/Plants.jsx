import React, { useEffect, useState } from "react";
import FilterSection from "../components/FilterSection";
import PlantSection from "../components/ProductSection";
import { LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import API from "../api/axios";
import { useSearchParams } from "react-router-dom";
import MobileFilterBar from "../components/MobileFilterBar";

const Plants = () => {
  
  const [searchParams] = useSearchParams();
  const [plants, setPlants] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);

  const handleApplyFilters = () => {
    setShowMobileFilters(false);
  };

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
      <div>
        <MobileFilterBar
  filters={filters}
  setFilters={setFilters}
  setPage={setPage}
/>

<<<<<<< HEAD
      </div>
      <div className="max-w-7xl mx-auto flex gap-6 md:px-4  md:px-4 py-5">
        <aside className="hidden lg:block bg-white rounded-lg border border-gray-200 p-6">
=======
      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-5">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 bg-white rounded-lg border border-gray-200 p-4 xl:p-5 sticky top-20 self-start">
>>>>>>> 47009a01de80be8fa14f92d8f1f6bd2932531161
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            setPage={setPage}
          />
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2 px-2">
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-xs md:text-sm font-semibold">
                {plants.length} Plants
              </p>
            </div>
<<<<<<< HEAD
             
=======

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
>>>>>>> 47009a01de80be8fa14f92d8f1f6bd2932531161
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

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-50 lg:hidden animate-fadeIn"
            onClick={() => setShowMobileFilters(false)}
          />
          
          {/* Filter Panel */}
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 lg:hidden animate-slideInRight flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <p className="text-xs text-gray-500 mt-0.5">Refine your search</p>
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                aria-label="Close filters"
              >
                <X size={22} />
              </button>
            </div>

            {/* Filter Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSection
                filters={filters}
                setFilters={setFilters}
                setPage={setPage}
                isMobile={true}
              />
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-gray-200 bg-white space-y-2">
              <button
                onClick={handleApplyFilters}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 active:scale-95 transition-all shadow-md"
              >
                Show {plants.length} Results
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Plants;
