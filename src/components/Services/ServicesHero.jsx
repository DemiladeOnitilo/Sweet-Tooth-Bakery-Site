import React, { useState, useEffect } from "react";
import MainButton from "../MainButton";

const ServicesHero = ({ scrollToSection }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex justify-center items-center mt-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url(https://img.freepik.com/free-photo/dessert-sweet-cake-tasty-bakery-soft_53876-30292.jpg?t=st=1742491335~exp=1742494935~hmac=8b0938dca842249a12314d57c7863b8f47410b7b91bcb13b12617d5f4fdd2d8c&w=900)] 
      bg-no-repeat bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          filter: "brightness(0.5)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-800/30" />

      <div className="relative z-10 flex flex-col gap-10 text-center max-w-2xl mx-auto px-6">
        <div className="md:bg-white/10 md:backdrop-blur-md md:border border-white/20 md:rounded-3xl p-10 md:shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Discover Our{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Signature Services
            </span>
          </h1>
        </div>
        <div >
          <MainButton
            name="Explore"
            onClick={scrollToSection}
            variant="primary"
            direction="down"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
