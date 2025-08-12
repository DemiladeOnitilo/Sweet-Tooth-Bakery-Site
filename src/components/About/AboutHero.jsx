import React, { useState, useEffect } from "react";

const AboutHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex justify-center items-center mt-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url(https://s.hdnux.com/photos/01/41/75/66/25681283/3/rawImage.jpg)] bg-no-repeat bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          filter: "brightness(0.5)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-800/30" />

      <div className="relative z-10 text-center max-w-xl mx-auto px-6">
        <div className="md:bg-white/10 md:backdrop-blur-md md:border border-white/20 md:rounded-3xl p-8 md:shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Get To Know Us
            </span>
          </h1>
          <p className="text-lg text-pink-100 leading-relaxed">
            Discover the heart and soul behind{" "}
            <span className="text-pink-300 font-semibold">Sweet Tooth</span>.
            From humble beginnings to a passion for creating{" "}
            <span className="text-purple-300 font-semibold">
              unforgettable desserts
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
