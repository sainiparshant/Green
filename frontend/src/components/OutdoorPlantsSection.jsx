import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import API from '../api/axios';
import { toast } from "react-toastify";
import { Loader } from './Loader';
import { Link } from 'react-router-dom';
import { Sun, Droplets, TreePine } from 'lucide-react';

const OutdoorPlantsSection = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOutdoorPlants = async () => {
    try {
      const { data } = await API.get("/products/all/plants?category=Outdoor&available=true&limit=6");
      setPlants(data.data.docs);
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutdoorPlants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4 md:px-10 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with Icons */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sun className="text-orange-500" size={32} />
            <h2 className="text-2xl md:text-4xl font-medium text-gray-900">
              Outdoor Plants Collection
            </h2>
            <TreePine className="text-green-600" size={32} />
          </div>
          <p className="text-gray-600 text-sm md:text-lg">
            Hardy plants perfect for your garden, balcony, and outdoor spaces
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
            <Sun className="text-yellow-500" size={20} />
            <span>Sun Loving</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
            <Droplets className="text-blue-500" size={20} />
            <span>Low Maintenance</span>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-700">
            <TreePine className="text-green-600" size={20} />
            <span>All Weather Hardy</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {plants.map((plant) => (
            <ProductCard key={plant._id} product={plant} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/plants?category=Outdoor">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-md">
              Explore All Outdoor Plants
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OutdoorPlantsSection;