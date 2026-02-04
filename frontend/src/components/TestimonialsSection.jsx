// TestimonialsSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The plants arrived in perfect condition! The packaging was excellent and the quality exceeded my expectations. My indoor snake plant is thriving!",
    purchaseInfo: "Bought 3 plants"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    text: "Amazing collection of pots! The ceramic pots are beautifully handcrafted. Customer service was very helpful in choosing the right plants for my balcony.",
    purchaseInfo: "Bought 2 pots & 4 plants"
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Delhi",
    rating: 5,
    text: "Best nursery online! The plant care guide they provided was super helpful. My money plant is growing beautifully. Highly recommend GreenLand!",
    purchaseInfo: "Bought 5 plants"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    text: "Excellent service and beautiful plants! Ordered succulents for my office desk and they look amazing. The delivery was quick and hassle-free.",
    purchaseInfo: "Bought 6 succulents"
  },
  {
    id: 5,
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Love my new indoor plants! The variety is great and prices are reasonable. The team even helped me choose plants suitable for low light conditions.",
    purchaseInfo: "Bought 4 plants"
  },
  {
    id: 6,
    name: "Arjun Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Outstanding quality! The flowering plants I ordered are blooming beautifully. Fast delivery and secure packaging. Will definitely order again!",
    purchaseInfo: "Bought 8 plants & 3 pots"
  }
];

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          // Scroll by card width + gap
          scrollContainer.scrollLeft += 1;
          
          // Reset to beginning when reaching end
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 20); // Smooth scrolling speed
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-medium text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="fill-yellow-400 text-yellow-400" 
                  size={20} 
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.8</span>
            <span className="text-gray-500">out of 5</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">(2,340+ verified reviews)</p>
        </div>

        {/* Scrolling Testimonials */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={`${testimonial.id}-${index}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative shrink-0 w-[320px] md:w-[380px]"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-emerald-100">
                <Quote size={40} fill="currentColor" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="fill-yellow-400 text-yellow-400" 
                    size={16} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">
                    ✓ Verified Buyer
                  </p>
                </div>
              </div>

              {/* Purchase Info */}
              <div className="mt-3 text-xs text-gray-400">
                {testimonial.purchaseInfo}
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center mt-8">
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;