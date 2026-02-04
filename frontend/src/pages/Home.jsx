import React from 'react'
import { ImagesSlide } from '../components/ImageSlide'
import FeaturedSection from '../components/FeaturedSection'
import CategorySection from '../components/CategorySection'
import AboutSection from '../components/AboutSection'
import FeaturedPotSection from '../components/FeaturedPotSection'
import TestimonialsSection from '../components/TestimonialsSection'
import OutdoorPlantsSection from '../components/OutdoorPlantsSection';
import NewArrivalsSection from '../components/NewArrivalsSection';


const Home = () => {
  return (
    <main className='min-h-screen'>
      <ImagesSlide />
      <FeaturedSection />
      <CategorySection />
      <NewArrivalsSection />
      <OutdoorPlantsSection />
      <FeaturedPotSection />
      <AboutSection />
      <TestimonialsSection />
    </main>
  )
}

export default Home