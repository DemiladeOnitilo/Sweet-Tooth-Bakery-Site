import React, { useState, useEffect } from "react";
import MainButton from "../MainButton";
import { FaArrowDown } from "react-icons/fa";
import heroBg from "../../assets/Images/Sweet-tooth-hero-bg.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 768) return; // parallax off on mobile
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[90vh] md:h-[100vh] lg:min-h-screen w-full flex items-center overflow-hidden transition-[height] duration-500 ease-in-out">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          filter: "brightness(0.2)",
          backgroundImage: `url(${heroBg})`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-10 mt-20 md:mt-10">
        <div className="flex flex-col items-center lg:items-start justify-center gap-4 max-w-4xl md:rounded-3xl py-4 md:py-12 transition-all duration-500 ease-in-out">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-medium text-center lg:text-left heading-text text-[#ffffff] leading-tight transition-[font-size] duration-500 ease-in-out">
            Satisfy your daily cravings with our freshly baked,{" "}
            <span className="text-[#BE185D] font-medium italic">
              mouthwatering
            </span>{" "}
            signature treats
          </h1>

          <p className="text-sm md:text-lg text-[#ffffff] text-center lg:text-left font-medium body-text max-w-xl lg:max-w-2xl leading-relaxed transition-[font-size] duration-500 ease-in-out">
            Treat yourself to our daily pastry selection, or bring the ultimate
            sweetness to your next event with our signature Pancake & Slushie
            catering packages.
          </p>

          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center lg:justify-start body-text mt-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-xl md:text-2xl font-semibold text-[#BE185D] transition-[font-size] duration-500 ease-in-out">
                10K+
              </div>
              <div className="text-sm md:text-md font-medium text-[#BE185D] transition-[font-size] duration-500 ease-in-out">
                Happy Customers
              </div>
            </div>
            <div className="w-px h-12 md:h-16 bg-[#ffffff] transition-[height] duration-500 ease-in-out" />
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-pink-500 transition-[font-size] duration-500 ease-in-out">
                50+
              </div>
              <div className="text-sm md:text-md text-pink-500 transition-[font-size] duration-500 ease-in-out">
                Unique Recipes
              </div>
            </div>
            <div className="w-px h-12 md:h-16 bg-[#ffffff] transition-[height] duration-500 ease-in-out" />
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-yellow-300 transition-[font-size] duration-500 ease-in-out">
                5★
              </div>
              <div className="text-sm md:text-md text-yellow-200 transition-[font-size] duration-500 ease-in-out">
                Premium Quality
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start mt-2 md:mt-4 w-full">
            <MainButton
              name="Explore Our Menu"
              link="/services"
              variant="primary"
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
