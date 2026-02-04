import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    category: "Indoor Plants",
    subtitle: "Perfect for your home",
    description: "Low light, easy care plants",
    image: "/indooor.webp",
    link: "/plants?category=Indoor",
    count: "45+"
  },
  {
    category: "Outdoor Plants",
    subtitle: "Garden Favourites",
    description: "Sun loving, hardy varieties",
    image: "/outdoor.jpg",
    link: "/plants?category=Outdoor",
    count: "38+"
  },
  {
    category: "Flowering Plants",
    subtitle: "Colorful Blooms",
    description: "Seasonal flowers & blossoms",
    image: "/flowers.webp",
    link: "/plants?category=Flowers",
    count: "28+"
  },
  {
    category: "Ceramic Pots",
    subtitle: "Handcrafted Elegance",
    description: "Artisan designed pots",
    image: "/pots_collection.jpg",
    link: "/pots",
    count: "50+"
  }
];

const CategorySection = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10 px-4">
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-2 md:mb-3">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-sm md:text-lg">
            Find exactly what you're looking for
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group flex-shrink-0 w-[220px] snap-start"
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-[240px]">
                  {/* Background Image */}
                  <img 
                    src={category.image} 
                    alt={category.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                    {/* Product Count Badge */}
                    <div className="flex justify-end">
                      <div className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <span className="text-xs font-semibold">
                          {category.count}
                        </span>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-lg font-bold mb-0.5 leading-tight">
                        {category.category}
                      </h3>
                      <p className="text-xs font-medium opacity-90 mb-2">
                        {category.subtitle}
                      </p>
                      
                      {/* Shop Now Button */}
                      <div className="inline-flex items-center gap-1.5 bg-emerald-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
                        Shop Now
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {categories.map((_, index) => (
              <div 
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:block px-4 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[340px]">
                  {/* Background Image */}
                  <img 
                    src={category.image} 
                    alt={category.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold">
                        {category.count} items
                      </span>
                    </div>

                    {/* Category Info */}
                    <div className="transform transition-all duration-500 group-hover:-translate-y-3">
                      <h3 className="text-2xl font-bold mb-2">
                        {category.category}
                      </h3>
                      <p className="text-base font-medium opacity-90 mb-1">
                        {category.subtitle}
                      </p>
                      <p className="text-sm opacity-75 mb-3">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Shop Now Button - appears on hover */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="text-base font-semibold bg-emerald-600 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                        Shop Now
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-emerald-400 transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 md:mt-10 px-4">
          <Link 
            to="/plants" 
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm md:text-base group"
          >
            Explore All Products
            <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
