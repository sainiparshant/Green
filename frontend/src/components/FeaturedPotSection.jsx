import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import API from '../api/axios';
import { toast } from "react-toastify";
import { Loader } from './Loader';
import { Link } from 'react-router-dom';



const FeaturedPotSection = () => {

   const [pots, setPots] = useState([]);
   const [loading, setLoading] = useState(true);


   const AllPots = async()=>{
      try {
        const {data} = await API.get("/products/all/pots?featured=true&available=true&limit=9");
        setPots(data.data.docs);
        
      } catch (error) {
        toast.error("Server Error");
        console.log(error);
        
      } finally{
        setLoading(false);
      }
    }

  useEffect(()=>{

    AllPots();

  }, []) 


   if (loading) {
    return (
      <div className="flex justify-center items-center py-20 ">
        <Loader/>
      </div>
    );
  }

  return (
    <div className='py-2 px-2 md:px-15 '>

    <div className='text-center'>
            <h1 className='md:text-4xl font-medium text-xl'>Flowering Pots</h1>
            <p className='my-1 md:my-4 text-sm md:text-lg'>Find exactly what you're looking for</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6'>
        {pots.map((pot) =>(
            <ProductCard key={pot._id} product={pot} productInfo={pot.potDetails.shape}/>
        ))}
      </div>
      <div className='text-center pt-4 md:py-5 mb-2'>
        <Link to={"/pots"}>
        <button className=' border-1 border-gray-300 shadow-2xl  text-xs p-3 rounded-lg'>
            View All Pots
      </button>
      </Link>
      </div>
    </div>
  )
}

export default FeaturedPotSection
