import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import API from '../api/axios';
import { toast } from "react-toastify";
import { Loader } from './Loader';
import { Link } from 'react-router-dom';
import { Palette, Sparkles, Award } from 'lucide-react';

const FeaturedPotSection = () => {
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(true);

  const AllPots = async () => {
    try {
      const { data } = await API.get("/products/all/pots?featured=true&available=true&limit=8");
      setPots(data.data.docs);
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllPots();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <section className="py-8 px-4 md:px-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-5">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-1">
            Ceramic Flowering Pots
          </h2>
          <p className="text-gray-600 text-sm md:text-md">
            Artisan-designed pots to complement your beautiful plants
          </p>
        </div>

        
        <div className="flex flex-wrap justify-center gap-6 md:gap-20 mb-10">
          <div className="flex items-center gap-2">
            <Palette className="text-amber-500" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Unique Designs</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="text-emerald-600" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-500" size={24} />
            <span className="text-sm md:text-base font-medium text-gray-700">Handcrafted</span>
          </div>
        </div>

        
        {pots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {pots.map((pot) => (
              <ProductCard key={pot._id} product={pot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No pots available at the moment</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/pots">
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-2 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
              View All Pots
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPotSection;
