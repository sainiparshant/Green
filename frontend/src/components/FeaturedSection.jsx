import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import API from '../api/axios';
import { toast } from "react-toastify";



const FeaturedSection = () => {

   const [plants, setPlants] = useState([]);
   const [loading, setLoading] = useState(true);

   
   const AllPlants = async()=>{
      try {
        const {data} = await API.get("/plants/all");
        setPlants(data.data.docs);
        
      } catch (error) {
        toast.error("Server Error");
        console.log(error);
        
      }  
    }

  useEffect(()=>{

    AllPlants();

  }, []) 



  return (
    <div className='py-10 md:py-15 px-5 md:px-25'>
      <div className='text-center mb-10'>
        <h1 className='md:text-4xl font-medium text-2xl'>Featured Collections</h1>
        <p className='my-4 text-sm md:text-lg '>Discover our handpicked selection of vibrant plants and artisan pots</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {plants.map((plant,index) =>(
            <ProductCard key={index} product={plant}/>
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
