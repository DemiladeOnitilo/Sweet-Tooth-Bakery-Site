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
      // ADJUSTED HEIGHTS: 50vh for services page, 60-70vh for Home page
      className={`${
        isServices ? "h-[50vh]" : "h-[60vh] xl:h-[70vh]"
      } relative flex items-center justify-center overflow-hidden w-full`}
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-[url('https://img.freepik.com/free-photo/close-up-hand-preparing-dessert_23-2148972041.jpg?t=st=1742476676~exp=1742480276~hmac=1db6886fba8af4069a7157b4569efe5aa330f96fa1aeceb70601921460e540a9&w=900')] 
        bg-no-repeat bg-center bg-cover transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(1.15)`,
          backgroundImage: `url(${ctaBg})`,
        }}
      />

      {/* OVERLAY: Changed from purple/pink gradient to a premium dark berry tint. 
          This makes the white text pop perfectly while keeping the food appetizing. */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-[#BE185D]/40" />

      {/* Content Container */}
      <div className="flex flex-col gap-6 relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* TYPOGRAPHY: Removed blocky all-caps and gradients. 
            Used heading-text with a soft pink italic highlight for an editorial look. */}
        <h2 className="heading-text text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          Crafting{" "}
          <span className="italic text-pink-300 font-medium">Sweet</span>{" "}
          Memories
        </h2>

        {!isServices && (
          <div className="flex flex-col gap-8 items-center mt-2">
            <p className="body-text text-base md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              From birthday celebrations to everyday treats, we create artisanal
              moments that taste exactly as good as they feel.
            </p>

            {/* Kept your MainButton component untouched */}
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
