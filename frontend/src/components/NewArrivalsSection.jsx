import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp } from "lucide-react";

const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      // Fetch recently added products (you can sort by createdAt on backend)
      const { data } = await API.get(
        "/products/all/plants?available=true&limit=8&sort=-createdAt",
      );
      setProducts(data.data.docs);
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <Sparkles size={18} />
            NEW ARRIVALS
          </div>
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-3">
            Just Landed This Week
          </h2>
          <p className="text-gray-600 text-sm md:text-lg">
            Fresh from our greenhouse - be the first to get these beauties
          </p>
        </div>

        {/* Trending Badge Info */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-500">
          <TrendingUp className="text-emerald-600" size={18} />
          <span>Trending among plant lovers</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div key={product._id} className="relative">
              {/* New Badge for first 3 items */}
              {index < 3 && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/plants">
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-2 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
              View All New Arrivals
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
