import { Leaf, Medal, Truck } from "lucide-react";
import React from "react";
import AboutSectionCard from "./AboutSectionCard";

const AboutSection = () => {

  const AllData = [
    {
      title: "Organic Growing",
      description: "All our plants are grown using sustainable, organic methods",
      icon:<Leaf />
    },
    {
      title: "Fast Delivery",
      description: "Free shipping on orders over 1000. Delivered with care",
      icon: <Truck/>
    },
    {
      title: "Quality Guarantee",
      description: "30-day guarantee on all plants. We stand behind our quality",
      icon: <Medal/>
    }
  ]

  return (
    <section className="w-full py-4 md:py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10 items-center">
        
        <div>
          <h1 className="text-xl md:text-4xl lg:text-5xl font-medium mb-2 md:mb-6 leading-tight">
            Growing Together <br className="hidden md:block" /> Since 2003
          </h1>

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            We believe everyone deserves a little green in their life. Our mission
            is to make plant ownership accessible, enjoyable, and sustainable for
            all.
            <br />
            <br />
            From rare tropicals to classic succulents, each plant is carefully
            selected and nurtured in our greenhouse before making its way to your
            home. We are committed to sustainable practices, from eco-friendly
            packaging to supporting reforestation projects with every purchase.
          </p>
        </div>

        
        <div className="w-full">
          <img
            src="/outdoor.jpg"
            alt="Outdoor plants"
            className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover rounded-2xl shadow-md"
          />
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-5 md:mt-25 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"> 
        {AllData.map((data, index) => (
          <AboutSectionCard key={index} data={data}/>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
