import React, { useState, useEffect, useRef } from "react";
import MainButton from "../MainButton";
import ctaBg from "../../assets/Images/cta-bg.jpg";

const CTASection = ({ isServices }) => {
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
      className={`${
        isServices ? "h-[50vh]" : "h-[60vh] xl:h-[70vh]"
      } relative flex items-center justify-center overflow-hidden w-full`}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 ] bg-no-repeat bg-center bg-cover transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(1.15)`,
          backgroundImage: `url(${ctaBg})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-[#BE185D]/40" />


      <div className="flex flex-col gap-6 relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="heading-text text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          Crafting{" "}
          <span className="italic text-[#BE185D] font-medium">Sweet</span>{" "}
          Memories
        </h2>

        {!isServices && (
          <div className="flex flex-col gap-8 items-center mt-2">
            <p className="body-text text-base md:text-xl text-white/90 font-medium max-w-2xl mx-auto font-light leading-relaxed">
              From birthday celebrations to everyday treats, we create artisanal
              moments that taste exactly as good as they feel.
            </p>

            <MainButton
              link="/services"
              name="START YOUR ORDER"
              variant="primary"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;
