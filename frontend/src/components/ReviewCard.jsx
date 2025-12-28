import React from 'react'

const ReviewCard = ({name, time, review}) => {
  return (
    <div className='mb-2 md:mb-5 flex flex-col gap-1'>
      <h1 className='text-sm md:text-md font-semibold'>{name}</h1>
      <p className='p text-xs md:text-sm'>{time}</p>
      <p className='p italic text-sm '>{review}</p>
    </div>
  )
}

export default ReviewCard
