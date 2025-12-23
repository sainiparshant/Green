import React from 'react'
import ProductCard from './ProductCard';

const products = [
  {
    title: "Monstera Deliciosa",
    price: "45",
    image: "/greenhouse.jpg",
    category: "Indoor Plants",
  },
  {
    title: "Fiddle Leaf Fig",
    price: "65",
    image: "/indoor_plants.jpg",
    category: "Indoor Plants",
  },
  {
    title: "Snake Plant",
    price: "35",
    image: "/outdoor.jpg",
    category: "Low Maintenance",
  },
  {
    title: "Ceramic Planter Set",
    price: "55",
    image: "/plant_pot.jpg",
    category: "Pots & Planters",
  },
  {
    title: "Terracotta Pots",
    price: "28",
    image: "/pots_collection.jpg",
    category: "Pots & Planters",
  },
   {
    title: "Snake Plant",
    price: "35",
    image: "/outdoor.jpg",
    category: "Low Maintenance",
  },
]


const FeaturedSection = () => {
  return (
    <div className='py-10 md:py-15 px-5 md:px-25'>
      <div className='text-center mb-10'>
        <h1 className='md:text-4xl font-medium text-2xl'>Featured Collections</h1>
        <p className='my-4 text-sm md:text-lg '>Discover our handpicked selection of vibrant plants and artisan pots</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product,index) =>(
            <ProductCard key={index} product={product}/>
        ))}
      </div>
      <div className='text-center py-10 md:py-10'>
        <button className='border-gray-400 border-2 bg-white p-4 rounded-full '>
            View All Products
      </button>
      </div>
    </div>
  )
}

export default FeaturedSection
