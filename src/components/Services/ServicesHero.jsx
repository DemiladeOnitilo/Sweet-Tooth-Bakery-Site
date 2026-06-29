import React, { useState, useEffect } from "react";
import MainButton from "../MainButton";

const ServicesHero = ({scrollToSection}) => {
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

      <div className="relative z-10 flex flex-col gap-5 md:gap-10 text-center max-w-2xl mx-auto px-6">
        <div className="flex flex-col gap-6 items-center md:bg-white/10 md:backdrop-blur-lg md:border border-white/20 md:rounded-3xl p-4 md:p-12 md:shadow-2xl md:transform md:over:scale-105 transition-all duration-500">
          <div className="inline-flex justify-center items-center w-fit px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full text-white text-xs lg:text-sm font-medium">
            ✨ Our Pastries
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Discover Our{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                Signature Services
              </span>
            </h1>
            <p className="text-md md:text-xl text-pink-100 max-w-2xl mx-auto p-6 leading-relaxed">
              From fudgy brownies to towering wedding cakes{" "}
              <span className="text-pink-300 font-semibold">Sweet tooth</span>{" "}
              is ready for your every need
            </p>
            {window.location.pathname === "/services" && (
              <div className="flex gap-2 md:gap-10 justify-center items-center">
                <MainButton name="Order Now" variant="primary" />
                <MainButton name="Browse All" variant="Secondary" onClick={scrollToSection} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
