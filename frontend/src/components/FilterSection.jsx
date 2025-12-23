import React from 'react'

const FilterSection = () => {
  return (
    <div className="min-h-screen">
      <div>
        <h1 className='text-lg font-medium mb-4'>Filters</h1>
        <hr className='text-gray-400'/>
      </div>
      <div className='mt-5 font-medium'>
        <h1 className='text-md font-semibold mb-4'>Category</h1>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="outdoor">Outdoor Plants</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="indoor">Indoor Plants</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="flower">Flower Plants</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="medicinal">Medicinal Plants</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id=""  className='w-4'/>
            <label htmlFor="bonsai">Bonsai Plants</label>
        </div>
      </div>
      <br />
      <hr className='text-gray-400'/>

      <div className='mt-5 font-medium'>
        <h1 className='text-md font-semibold mb-4'>Price Range</h1>
        <div className='flex flex-col gap-3'>
            <input type="range" name="" id="price" min={100} max={2000} />
            <label htmlFor="price">Price</label>
        </div>
      </div>
      <br />
      <hr className='text-gray-400'/>

      <div className='mt-5 font-medium'>
        <h1 className='text-md font-semibold mb-4'>Availability</h1>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="instock">In Stock</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="outstock">Out of Stock</label>
        </div>
      </div>
      <br />
      <hr className='text-gray-400'/>

      <div className='mt-5 font-medium'>
        <h1 className='text-md font-semibold mb-4'>Size</h1>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="small">Small</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="medium">Medium</label>
        </div>
        <div className='flex gap-3'>
            <input type="checkbox" name="" id="" className='w-4'/>
            <label htmlFor="large">Large</label>
        </div>
      </div>
      <br />
    </div>
  )
}

export default FilterSection
