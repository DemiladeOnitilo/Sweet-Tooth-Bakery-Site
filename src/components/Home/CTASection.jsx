import React, { useState, useEffect, useRef } from "react";
import MainButton from "../MainButton";

const CTASection = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const sectionCenter = rect.top + sectionHeight / 2;
        const viewportCenter = viewportHeight / 2;

        if (sectionCenter <= viewportCenter) {
          const distancePastCenter = viewportCenter - sectionCenter;
          setScrollY(distancePastCenter);
        } else {
          setScrollY(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[url(https://img.freepik.com/free-photo/close-up-hand-preparing-dessert_23-2148972041.jpg?t=st=1742476676~exp=1742480276~hmac=1db6886fba8af4069a7157b4569efe5aa330f96fa1aeceb70601921460e540a9&w=900)] 
        bg-no-repeat bg-center bg-cover transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          filter: "brightness(0.4)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-purple-900/40" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8 text-white leading-tight">
          CRAFTING SWEET
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            MEMORIES
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          From birthday celebrations to everyday treats, we create moments that
          taste as good as they feel
        </p>
        <MainButton link="/Order" name="START YOUR ORDER" />
      </div>
    </section>
  );
};

export default CTASection;
