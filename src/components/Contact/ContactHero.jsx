import React, { useState, useEffect } from "react";
import contactBg from "../../assets/Images/contact-hero-bg.avif";

const ContactHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[50vh] md:h-[60vh] flex justify-center items-center  overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center lg:bg-top transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.15}px) scale(1.1)`,
          backgroundImage: `url(${contactBg})`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-[#BE185D]/40" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mt-8">
        <h1 className="heading-text text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-4">
          Get in <span className="italic text-[#BE185D] font-medium">Touch</span>
        </h1>
        
        <p className="body-text text-base md:text-xl text-white/90 font-light max-w-md mx-auto leading-relaxed">
          Have a question about an order, a custom cake request, or just want to chat about pastries? Drop us a line!
        </p>
      </div>
    </div>
  );
};

export default ContactHero;