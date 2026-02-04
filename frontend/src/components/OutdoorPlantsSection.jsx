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
      const { data } = await API.get("/products/all/plants?category=Outdoor&available=true&limit=8");
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
    <section className="py-12 md:py-16 px-4 md:px-10 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            Outdoor Plants Collection
          </h2>
          <p className="text-gray-600 text-sm md:text-lg">
            Hardy plants perfect for your garden and balcony
          </p>
        </div>

        {/* Features Strip */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10">
          <div className="flex items-center gap-2">
            <Sun className="text-yellow-500" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Sun Loving</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="text-blue-500" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Low Maintenance</span>
          </div>
          <div className="flex items-center gap-2">
            <TreePine className="text-green-600" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Weather Hardy</span>
          </div>
        </div>

        {/* Products Grid */}
        {plants.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {plants.map((plant) => (
              <ProductCard key={plant._id} product={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No outdoor plants available at the moment</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/plants?category=Outdoor">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-md">
              View All Outdoor Plants
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OutdoorPlantsSection;