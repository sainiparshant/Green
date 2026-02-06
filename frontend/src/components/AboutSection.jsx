import { Leaf, Truck, Medal, Quote } from "lucide-react";
import React from "react";

const AboutSection = () => {
  const sustainabilityFeatures = [
    {
      title: "Organic Growing",
      description: "Sustainably grown using organic methods",
      icon: <Leaf />
    },
    {
      title: "Fast Delivery",
      description: "Free shipping on orders over ₹1000",
      icon: <Truck />
    },
    {
      title: "Quality Guarantee",
      description: "30-day guarantee on all plants",
      icon: <Medal />
    }
  ];

  return (
    <section className="bg-white px-4 md:px-10 py-10 md:py-14 relative overflow-hidden">
      {/* Decorative Background Elements - Adjusted for mobile */}
      <div className="absolute top-5 md:top-10 left-2 md:left-5 opacity-5 md:opacity-10 text-emerald-600 rotate-12 pointer-events-none">
        <Leaf size={50} className="md:w-20 md:h-20" />
      </div>
      <div className="absolute top-20 md:top-32 right-2 md:right-10 opacity-5 md:opacity-10 text-emerald-600 -rotate-45 pointer-events-none">
        <Leaf size={40} className="md:w-[60px] md:h-[60px]" />
      </div>
      <div className="absolute bottom-32 md:bottom-20 left-1/4 opacity-5 md:opacity-10 text-emerald-600 rotate-90 pointer-events-none hidden md:block">
        <Leaf size={100} />
      </div>
      <div className="absolute bottom-10 right-1/3 opacity-5 md:opacity-10 text-emerald-600 -rotate-12 pointer-events-none hidden md:block">
        <Leaf size={70} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center mb-8 md:mb-16">
          <div className="space-y-4 md:space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              About Us
            </span>

            <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Growing together since 2003
            </h2>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We believe everyone deserves a little green in their life. Our mission
              is to make plant ownership simple, enjoyable, and sustainable for all.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Every plant is carefully selected and nurtured in our greenhouse before
              reaching your home. From eco-friendly packaging to responsible sourcing,
              sustainability is at the core of what we do.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-2 md:pt-4">
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
                  20+
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Years Experience</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
                  5000+
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Happy Customers</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
                  150+
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-tight">Plant Varieties</p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/outdoor.jpg"
              alt="Outdoor plants"
              className="w-full h-[280px] md:h-[420px] object-cover rounded-lg md:rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Customer Testimonial - Mobile Optimized */}
        <div className="mb-8 md:mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg md:rounded-xl p-4 md:p-8 relative">
            <div className="absolute top-3 md:top-4 left-3 md:left-4 text-emerald-200">
              <Quote size={28} className="md:w-10 md:h-10" fill="currentColor" />
            </div>
            <div className="relative z-10 pl-6 md:pl-12">
              <p className="text-sm md:text-lg text-gray-700 italic leading-relaxed mb-3 md:mb-4">
                "I was skeptical about ordering plants online, but Green exceeded all my expectations. The plants arrived healthy and beautifully packaged!"
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                  SP
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs md:text-sm">Sarah Patel</p>
                  <p className="text-[10px] md:text-xs text-gray-600">Plant Enthusiast, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          {sustainabilityFeatures.map((data, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center gap-2 md:gap-3 border border-gray-200 rounded-lg md:rounded-xl p-2.5 md:p-4 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                {React.cloneElement(data.icon, { 
                  className: "w-4 h-4 md:w-5 md:h-5"
                })}
              </div>

              <div>
                <h4 className="text-[11px] md:text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600 leading-tight">
                  {data.title}
                </h4>
                <p className="text-[9px] md:text-xs text-gray-600 leading-tight mt-0.5 md:mt-1">
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
