import React from 'react'
import { CategoryCard } from './CategoryCard'
import { Link } from 'react-router-dom'

const categories = [
    {
        category: "Indoor Plants",
        subtitle:"Perfect for your home",
        image:"/indoor_plants.jpg"
    },
    {
        category: "Outdoor Plants",
        subtitle:"Garden Favourites",
        image:"/outdoor.jpg"
    },
    {
        category: "Ceramic Pots",
        subtitle:"HandCrafted Elegance",
        image:"/pots_collection.jpg"
    }
]

const CategorySection = () => {
  return (
    <div className='mx-2 md:mx-10 bg-gray-100 rounded-lg px-2 sm:px-5 md:px-15 md:pt-4'>
        <div className='text-center'>
            <h1 className='md:text-4xl font-medium text-xl'>Shop By Category</h1>
            <p className='my-1 md:my-4 text-sm md:text-lg'>Find exactly what you're looking for</p>
      </div>
      <div className='flex gap-4 overflow-x-scroll md:overflow-x-hidden'>
        {categories.map((category, index) => (
            <Link to={`/plants`} key={index}>
              <CategoryCard category={category} />
            </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySection
