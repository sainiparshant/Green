import { Leaf, Medal, Truck, Shield, Headphones, Star } from "lucide-react";
import React from "react";

const AboutSection = () => {
  const sustainabilityFeatures = [
    {
      title: "Organic Growing",
      description: "All our plants are grown using sustainable, organic methods",
      icon: <Leaf />
    },
    {
      title: "Fast Delivery",
      description: "Free shipping on orders over ₹1000. Delivered with care",
      icon: <Truck />
    },
    {
      title: "Quality Guarantee",
      description: "30-day guarantee on all plants. We stand behind our quality",
      icon: <Medal />
    },
    {
      title: "24/7 Support",
      description: "Expert plant care guidance available anytime you need help",
      icon: <Headphones />
    },
    {
      title: "4.8/5 Rating",
      description: "Trusted by 5000+ happy customers across India",
      icon: <Star />
    }
  ];

  return (
    <section className="px-4 md:px-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Main About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 leading-tight text-gray-900">
              Growing Together <br className="hidden md:block" /> Since 2003
            </h2>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4">
              We believe everyone deserves a little green in their life. Our mission
              is to make plant ownership accessible, enjoyable, and sustainable for
              all.
            </p>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              From rare tropicals to classic succulents, each plant is carefully
              selected and nurtured in our greenhouse before making its way to your
              home. We are committed to sustainable practices, from eco-friendly
              packaging to supporting reforestation projects with every purchase.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 md:mt-10">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-600">20+</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-600">5000+</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-600">150+</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1">Plant Varieties</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src="/outdoor.jpg"
              alt="Outdoor plants"
              className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>

        {/* Sustainability Features */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {sustainabilityFeatures.map((data, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                {React.cloneElement(data.icon, { size: 28 })}
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                {data.title}
              </h4>
              <p className="text-sm text-gray-600">
                {data.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
