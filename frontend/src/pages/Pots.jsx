import React, { useEffect, useState } from "react";
import { LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import API from "../api/axios";
import ProductSection from "../components/ProductSection";
import PotFilters from "../components/PotFilters";

const Pots = () => {
  const [pots, setPots] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-5">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 bg-white rounded-lg border border-gray-200 p-4 xl:p-5 sticky top-20 self-start">
          <PotFilters
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
                {pots.length} Pots
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

          <ProductSection
            products={pots}
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
              <PotFilters
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
                Show {pots.length} Results
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

export default Pots;
