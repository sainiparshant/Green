import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Bring Nature Home",
    subtitle: "Transform your space with beautiful plants",
    image: "/indoor_plants.jpg",
  },
  {
    title: "Handcrafted Pots",
    subtitle: "Artisan ceramics for every style",
    image: "/plant_pot.jpg",
  },
  {
    title: "Garden Essentials",
    subtitle: "Everything you need to grow",
    image: "/pots_collection.jpg",
  },
  {
    title: "GreenHouse Wonders",
    subtitle: "Exotic plants for your collection",
    image: "/greenhouse.jpg",
  }
];

export function ImagesSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[50vh] md:h-[75vh] overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

         
          <div className="absolute inset-0 bg-black/20" />

         
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-3xl">
              <h1 className="text-4xl md:text-7xl font-serif text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl text-white/90 mb-8">
                {slide.subtitle}
              </p>
              <button className="px-8 py-3 rounded-full bg-emerald-700 text-white hover:bg-emerald-600 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}


      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
