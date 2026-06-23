import React from "react";
import ServiceSelection from "../components/Services/ServiceSelection";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import { scroller } from "react-scroll";
import CTASection from "../components/Home/CTASection";

const Services = () => {
  const scrollToSection = () => {
    scroller.scrollTo("target-section", {
      duration: 500,
      smooth: true,
      offset: -70,
    });
  };

  return (
    <div className="flex flex-col">
      <ServicesHero scrollToSection={scrollToSection} />
      <div id="target-section">
        <PastrySection />
      </div>
      <CTASection isServices={true} />
      <ServiceSelection />
    </div>
  );
};

export default Services;
