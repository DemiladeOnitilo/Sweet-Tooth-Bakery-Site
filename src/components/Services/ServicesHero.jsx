import React, { useState, useEffect } from "react";
import MainButton from "../MainButton";
import serviceHeroBg from  "../../assets/Images/services-hero-bg.jpg"

const ServicesHero = ({ scrollToSection }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex justify-center items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(1.1)`,
          backgroundImage: `url(${ serviceHeroBg })`
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-[#BE185D]/40" />

      <div className="relative z-10 flex flex-col gap-6 text-center max-w-3xl mx-auto px-6 mt-8">
        <h1 className="heading-text text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          Discover Our <br />
          <span className="italic text-[#BE185D] font-medium">
            Signature
          </span>{" "}
          Services
        </h1>

        <p className="body-text text-base md:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
          From fudgy brownies to towering wedding cakes, Sweet Tooth is ready to
          elevate your every celebration.
        </p>

        {window.location.pathname === "/services" && (
          <div className="flex gap-4 justify-center items-center mt-4">
            <MainButton name="Order Now" variant="primary" />
            <button
              onClick={scrollToSection}
              className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full body-text text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 px-8 py-3.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              Browse All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesHero;
