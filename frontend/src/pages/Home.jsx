import React from 'react'
import { ImagesSlide } from '../components/ImageSlide'
import FeaturedSection from '../components/FeaturedSection'
import CategorySection from '../components/CategorySection'
import AboutSection from '../components/AboutSection'
import FeaturedPotSection from '../components/FeaturedPotSection'

const Home = () => {
  return (
    <main className='min-h-screen'>
      <ImagesSlide/>
      <FeaturedSection/>
      <FeaturedPotSection/>
      <AboutSection/>
    </main>
  )
}

export default Home