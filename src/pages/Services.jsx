import React from "react";
import ServiceSelection from "../components/Services/ServiceSelection";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import { scroller } from "react-scroll";

const Services = () => {
  const scrollToSection = () => {
    scroller.scrollTo("target-section", {
      duration: 500,
      smooth: true,
      offset: -70,
    });
  };

  return (
    <div className="flex flex-col gap-y-5">
      <ServicesHero scrollToSection={scrollToSection} />
      <div id="target-section">
        <ServiceSelection />
      </div>
      <div className="bg-[url(https://static.vecteezy.com/system/resources/previews/046/630/849/non_2x/pattern-sweet-food-dessert-birthday-cake-with-candle-and-ice-cream-set-of-cute-icons-cartoon-holiday-attributes-drawing-doodles-seamless-background-vector.jpg)] bg-no-repeat bg-center bg-cover h-[30vh] mt-20"></div>
      <PastrySection />
    </div>
  );
};

export default Services;
