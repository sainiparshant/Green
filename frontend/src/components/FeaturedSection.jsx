import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "../api/axios";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const AllPlants = async () => {
    try {
      const { data } = await API.get(
        "/products/all/plants?",
      );
      console.log(data.data);
      setPlants(data.data.docs);
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllPlants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-2 px-2 md:py-5 md:px-10 border-1 rounded-lg border-gray-200 m-2 md:m-5">
      <div className="text-center mb-2 md:mb-4">
        <h1 className="md:text-4xl font-medium text-xl">
          Featured Collections
        </h1>
        <p className="md:my-2 text-xs md:text-lg ">
          Discover our handpicked selection of vibrant plants.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {plants.map((plant) => (
          <ProductCard
            key={plant._id}
            product={plant}
            productInfo={plant.category}
          />
        ))}
      </div>

     
      <div className="text-center mt-8">
        <Link to="/plants">
          <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-2 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
            View All Plants
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
