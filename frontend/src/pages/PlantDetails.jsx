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


const PlantDetails = () => {

  const [plant, setPlant] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  

  const { id } = useParams();

  const fetchPlantDetail = async () => {
  try {
    const { data } = await API.get(`/plants/single-plant/${id}`);
    console.log(data.data);
    

    setPlant(data.data);
  } catch (error) {
    console.log(error.response?.data || error);
  } finally {
    setLoading(false);
  }
}


  useEffect(() =>{
      fetchPlantDetail();
  } ,[])

  useEffect(() => {
    if (plant?.images?.length) {
      setActiveImage(plant.images[0].url);
    }
  }, [plant]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen m-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 md:p-10">
        <div className="max-w-sm md:max-w-xl">
          <ProductImagesLayout
            images={plant.images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
          />
        </div>

        <div>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-1 text-xs rounded">{plant.size}</button>
            <button className="bg-gray-200 p-1 text-xs rounded">{plant.carelevel}</button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">{plant.name}</h1>
            <p className="p italic">{plant.category}</p>

            <div className="flex gap-2 items-center mt-5">
              <StarRating rating={5} />
              <p className="p text-sm">(126 reviews)</p>
            </div>

            <div className="mt-5">
              <h1 className="text-lg">
                {plant.title}
              </h1>
            </div>
          </div>

          <hr className="mt-5 text-gray-300" />

          <div className="flex items-center justify-around mt-5">
            <PlantFeatures icon={<Sun />} title={"Light"} subtitle={plant.light} />
            <PlantFeatures
              icon={<Droplet />}
              title={"Water"}
              subtitle={plant.water}
            />
            <PlantFeatures
              icon={<TreePalm />}
              title={"Care Level"}
              subtitle={plant.carelevel}
            />
          </div>

          <hr className="mt-5 text-gray-300" />

          <div className="mt-5 flex items-baseline gap-2">
            <h1 className="text-4xl font-semibold">&#8377; {plant.price}</h1>
            <p className="p text-sm">Free shipping over 500</p>
          </div>

          <div className="mt-5">
            <button className="w-full bg-emerald-900 text-white text-md p-2 rounded-lg cursor-pointer">
              Add To Cart
            </button>
            <button className="w-full border border-emerald-900 hover:bg-gray-200/90 text-black cursor-pointer mt-2 text-md p-2 rounded-lg">
              Buy Now
            </button>
          </div>

          <div className="max-w-xl mt-10">

            <div className="mt-5">
              <h1 className="text-xl font-bold ">About This Plant</h1>
              <p className="p italic mt-3">
                The Monte Carlo is a lush, elegant plant known for its vibrant
                foliage and effortless charm. Its rich, glossy leaves bring life
                to any corner of your home, making it perfect for living rooms,
                bedrooms, or workspaces. Easy to care for and adaptable to most
                indoor environments, this plant is a great choice for beginners
                and plant lovers alike. With just the right amount of light and
                occasional watering, the Monte Carlo will reward you with fresh,
                healthy growth all year long.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="text-gray-300" />

      <div className="mt-10">
        <div className="px-10">
            <h1 className="text-3xl text-gray-800 font-semibold mb-5">Customer Reviews </h1>
            {reviews.map((review, idx) => (
              <div key={idx} className="border-b border-gray-200 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CircleUser size={30}/>
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

export default PlantDetails;
