import React, { useState } from "react";
import StarRating from "../components/StarRating";
import { Droplet, Sun, TreePalm } from "lucide-react";

const images = [
  {
    id: 1,
    url: "/indoor_plants.jpg",
  },
  {
    id: 2,
    url: "/outdoor.jpg",
  },
  {
    id: 3,
    url: "/plant_pot.jpg",
  },
  {
    id: 4,
    url: "/indoor_plants.jpg",
  },
];

const PlantDetails = () => {
  const [activeImage, setActiveImage] = useState(images[0].url);

  return (
    <div className="min-h-screen">
      <div className="flex p-10 gap-10">
        <div className="max-w-xl ">
          <div>
            <img
              src={activeImage}
              alt=""
              className="w-full rounded-lg duration-300"
            />
          </div>

          <div className="grid grid-cols-4 gap-6 py-4 ">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`rounded-lg border ${
                  activeImage === img.url
                    ? "border-emerald-500"
                    : "border-gray-300"
                }`}
              >
                <img src={img.url} alt="" className="rounded-lg cursor-pointer "/>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-1 text-xs rounded">Size</button>
            <button className="bg-gray-200 p-1 text-xs rounded">Care</button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">Monte Carlo</h1>
            <p className="p italic">plant category</p>

            <div className="flex gap-2 items-center mt-5">
              <StarRating rating={5}/>
              <p className="p text-sm">(126 reviews)</p>
            </div>

            <div className="mt-5">
              <h1 className="text-lg">
                A bold plant with thick, glossy leaves in deep burgundy,
                perfect for <br /> modern interiors.
              </h1>
            </div>
          </div>

          <hr className="mt-5 text-gray-300"/>

          <div className="flex items-center justify-around mt-5">
            <div className="flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-full p-3">
                <Sun className="text-emerald-800"/>
              </div>
              <h1 className="font-semibold text-md">Light</h1>
              <p className="p text-sm font-medium">light me</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-full p-3">
                <Droplet className="text-emerald-800"/>
              </div>
              <h1 className="font-semibold text-md">Water</h1>
              <p className="p text-sm font-medium">Medium</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="bg-gray-200 rounded-full p-3">
                <TreePalm className="text-emerald-800"/>
              </div>
              <h1 className="font-semibold text-md">Care Level</h1>
              <p className="p text-sm font-medium">Easy</p>
            </div>
          </div>

          <hr className="mt-5 text-gray-300"/>

          <div className="mt-5 flex items-baseline gap-2">
            <h1 className="text-4xl font-semibold">$450</h1>
            <p className="p text-sm">Free shipping over 500</p>
          </div>

          <div className="mt-5">
            <button className="w-full bg-emerald-900 text-white text-md p-4">Add To Cart</button>
          </div>

        </div>
        

      </div>
    </div>
  );
};

export default PlantDetails;
