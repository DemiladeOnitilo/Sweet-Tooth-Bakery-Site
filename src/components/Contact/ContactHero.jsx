import React, { useState, useEffect } from "react";

const ContactHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] flex justify-center items-center mt-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url(https://img.freepik.com/free-photo/black-woman-talking-phone_53876-128553.jpg?t=st=1742384861~exp=1742388461~hmac=261fb1ea1e1c844fac18e94e39cfece474169f0b24894163a215a1407cd25426&w=1380)] 
        bg-no-repeat bg-cover bg-center lg:bg-top transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          filter: "brightness(0.5)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/20 to-pink-800/30" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <div className="md:bg-white/10 md:backdrop-blur-md md:border border-white/20 md:rounded-3xl p-10 md:shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;