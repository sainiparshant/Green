import React, { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import { CircleUser, Droplet, Sun, TreePalm } from "lucide-react";
import ProductImagesLayout from "../components/ProductImagesLayout";
import PlantFeatures from "../components/PlantFeatures";
import ReviewCard from "../components/ReviewCard";
import API from "../api/axios"
import { useParams } from "react-router-dom";
import {Loader} from "../components/Loader";


const reviews = [
  {
    name: "Aarav Sharma",
    time: "2 days ago",
    review: "Beautiful and healthy plant. Arrived well packed and fresh.",
    rating: 5
  },
  {
    name: "Neha Verma",
    time: "1 week ago",
    review: "Looks great in my living room. Needs moderate watering.",
    rating: 4
  },
  {
    name: "Rohan Patel",
    time: "3 weeks ago",
    review: "Good quality but delivery took a little longer.",
    rating: 4
  },
  {
    name: "Simran Kaur",
    time: "1 month ago",
    review: "Perfect for beginners. Very easy to take care of.",
    rating: 5
  },
  {
    name: "Vikram Rao",
    time: "2 months ago",
    review: "Plant was smaller than expected but still healthy.",
    rating: 3
  }
];


const PotDetails = () => {

  const [pot, setPot] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  

  const { id } = useParams();

  const fetchPotDetail = async () => {
  try {
    const { data } = await API.get(`/products/single-pot/${id}`);
    setPot(data.data[0]);

  } catch (error) {
    console.log(error.response?.data || error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() =>{
      fetchPotDetail();
      
  } ,[])

  useEffect(() => {
    if (pot?.images?.length) {
      setActiveImage(pot.images[0].url);
    }
  }, [pot]);


  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:m-2 md:m-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-5 p-4 md:p-10">
        <div className="max-w-sm md:max-w-xl">
          <ProductImagesLayout
            images={pot.images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>

        <div>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-1 text-xs rounded">{pot.size}</button>
            <button className="bg-gray-200 p-1 text-xs rounded">{pot.potDetails.material}</button>
          </div>

          <div className="mt-1 md:mt-5 flex flex-col md:gap-2">
            <h1 className="sm:text-4xl font-semibold text-2xl">{pot.name}</h1>
            <p className="p italic">{pot.potDetails.category}</p>

            <div className="flex gap-2 items-center mt-1 md:mt-3">
              <StarRating rating={5} />
              <p className="p text-sm">(126 reviews)</p>
            </div>

            <div className="mt-1 md:mt-3">
              <h1 className="text-sm md:text-lg ">
                {pot.title}
              </h1>
            </div>
          </div>

         

          <div className="mt-2 md:mt-5 flex items-baseline gap-2">
            <h1 className="text-2xl md:text-4xl font-semibold">&#8377; {pot.price}</h1>
            <p className="p text-xs md:text-sm">Free shipping over 500</p>
          </div>

          <div className="mt-2 md:mt-5">
            <button className="w-full bg-emerald-900 text-white text-sm md:text-md p-2 rounded-lg cursor-pointer">
              Add To Cart
            </button>
            <button className="w-full border border-emerald-900 hover:bg-gray-200/90 text-black cursor-pointer mt-2 text-sm md:text-md p-2 rounded-lg">
              Buy Now
            </button>
          </div>

          <div className="max-w-xl md:mt-10 ">

            <div className="mt-2 md:mt-5">
              <h1 className="text-xl font-bold ">About This {pot.productType}</h1>
              <p className="p italic text-sm sm:text-md mt-1 md:mt-3">
                {pot.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="mt-4 md:mt-10 ">
        <div className="px-4 md:px-10">
            <h1 className="text-xl md:text-3xl text-gray-800 font-semibold mb-5">Customer Reviews </h1>
            {reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CircleUser size={20}/>
                    <StarRating rating={review.rating}/>
                  </div>
                  <ReviewCard name={review.name} time={review.time} review={review.review} />
              </div>
            ))}
            
        </div>
      </div>

      <div className="mt-10 px-10 min-h-screen">
        <h1 className="font-bold text-3xl">You may Also like</h1>
      </div>
    </div>
  );
};

export default PotDetails;
