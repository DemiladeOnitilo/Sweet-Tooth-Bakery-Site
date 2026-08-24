import React, { useState, useEffect } from "react";
import aboutHero from "../../assets/Images/About-hero-bg.jpg";

const AboutHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[50vh] md:h-[70vh] flex justify-center items-center overflow-hidden transition-all duration-500">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(1.1)`,
          backgroundImage: `url(${aboutHero})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-[#BE185D]/40" />

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-8">
        <h1 className="heading-text text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
          Get To Know <span className="italic text-pink-200 font-medium">Us</span>
        </h1>
        <p className="body-text text-base md:text-xl text-white/90 leading-relaxed font-light">
          Discover the heart and soul behind Sweet Tooth. From humble beginnings 
          to a lifelong passion for creating unforgettable desserts.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;