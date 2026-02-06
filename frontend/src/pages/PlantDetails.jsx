import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import { Droplet, Sun, TreePalm } from "lucide-react";
import ProductImagesLayout from "../components/ProductImagesLayout";
import PlantFeatures from "../components/PlantFeatures";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../redux/cartSlice";
import ReviewsSection from "../components/ReviewSection";

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchPlantDetail = async () => {
    try {
      const { data } = await API.get(`/products/single-plant/${id}`);
      setPlant(data.data);
      console.log(data.data);
      
      setSelectedVariant(data.data.variants[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantDetail();
  }, []);

  useEffect(() => {
    if (plant?.images?.length) {
      setActiveImage(plant.images[0].url);
    }
  }, [plant]);

  const increase = () => {
    if (quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = async () => {
    if (!auth) {
      navigate("/login");
      return;
    }

    if (!selectedVariant) {
      toast.error("Please select a size");
      return;
    }

    try {
      await dispatch(
        addItem({
          productId: plant._id,
          variantId: selectedVariant._id,
          quantity
        })
      ).unwrap();

      toast.success("Item added to cart");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <ProductImagesLayout
          images={plant.images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />

        
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">
            {plant.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {plant.plantDetails.category}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={plant.avgRating || 4.5} />
            <span className="text-sm text-gray-600">
              {plant.totalReview || 0} reviews
            </span>
          </div>

          <p className="mt-4 text-gray-700">
            {plant.title}
          </p>

         
          <div className="flex gap-10 mt-6">
            <PlantFeatures icon={<Sun />} title="Light" subtitle={plant.plantDetails.light} />
            <PlantFeatures icon={<Droplet />} title="Water" subtitle={plant.plantDetails.water} />
            <PlantFeatures icon={<TreePalm />} title="Care" subtitle={plant.plantDetails.carelevel} />
          </div>

          
          <div className="mt-6">
            <span className="text-3xl font-semibold text-emerald-700">
              ₹{selectedVariant.price}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              Free shipping over ₹500
            </span>
          </div>

         
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Select Size</p>
            <div className="flex gap-3">
              {plant.variants.map((variant) => (
                <button
                  key={variant._id}
                  disabled={variant.stock === 0}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                  className={`px-4 py-2 rounded-lg border text-sm transition
                    ${
                      selectedVariant._id === variant._id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-gray-300"
                    }
                    ${variant.stock === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:border-emerald-600"}
                  `}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

         
          <div className="mt-6 flex gap-4">
            <div className="flex items-center border rounded-lg">
              <button onClick={decrease} className="px-3 py-2">−</button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={increase} className="px-3 py-2">+</button>
            </div>

            <button
              onClick={addToCartHandler}
              disabled={selectedVariant.stock === 0}
              className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-3 disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>

         
          <div className="mt-8">
            <h2 className="text-lg font-semibold">About this plant</h2>
            <p className="text-gray-600 mt-2">
              {plant.description}
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-12">
        <ReviewsSection productId={plant._id} />
      </div>
    </div>
  );
};

export default PlantDetails;
