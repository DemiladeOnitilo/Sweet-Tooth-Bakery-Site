import React from "react";
import ServiceSelection from "../components/Services/ServiceSelection";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import { scroller } from "react-scroll";
import CTASection from "../components/Home/CTASection";
import { products } from "../components/products";
import BentoServiceGrid from "../components/Services/BentoServiceGrid";
import SingleCardService from "../components/Services/SingleCardService";

const Services = ({ category }) => {
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

      <SingleCardService
        singleProduct={products[0]}
        singleProductTypes={products[0].types}
        productNumber="01"
      />

      <PastrySection indexes={[1, 2]} altOffset={2} />

      <div className="w-full bg-[#FCFBF9] py-20 px-6 border-y border-gray-100">
        <p className="body-text text-center text-sm font-bold text-[#BE185D] tracking-widest uppercase mb-10">
          What our customers say
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              initials: "TA",
              name: "Temi A.",
              area: "Victoria Island",
              date: "May 2026",
              rating: 5,
              quote:
                "Best brownies in Lagos, full stop. The packaging was stunning.",
            },
            {
              initials: "CO",
              name: "Chioma O.",
              area: "Lekki",
              date: "Jan 2026",
              rating: 5,
              quote:
                "My wedding cake was an absolute dream. Tasted even better than it looked.",
            },
            {
              initials: "BK",
              name: "Bolu K.",
              area: "Ikoyi",
              date: "Dec 2025",
              rating: 4.5,
              quote:
                "Delivered exactly on time, still warm, and tasted perfectly rich.",
            },
          ].map((items, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={
                      s <= Math.floor(items.rating)
                        ? "#BE185D"
                        : s - 0.5 === items.rating
                          ? "url(#half)"
                          : "#e5e7eb"
                    }
                  >
                    <defs>
                      <linearGradient id="half">
                        <stop offset="50%" stopColor="#BE185D" />
                        <stop offset="50%" stopColor="#e5e7eb" />
                      </linearGradient>
                    </defs>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p className="body-text text-base text-gray-700 leading-relaxed flex-1 italic">
                "{items.quote}"
              </p>
              <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#BE185D]/10 flex items-center justify-center text-[#BE185D] text-sm font-bold body-text">
                    {items.initials}
                  </div>
                  <div>
                    <p className="body-text text-sm font-bold text-gray-900">
                      {items.name}
                    </p>
                    <p className="body-text text-xs text-gray-500">
                      {items.area}
                    </p>
                  </div>
                </div>
                <p className="body-text text-xs text-gray-400 font-medium uppercase tracking-wider">
                  {items.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SingleCardService
        singleProduct={products[3]}
        singleProductTypes={products[3].types}
        productNumber="04"
      />

      <PastrySection indexes={[4]} />

      <BentoServiceGrid
        bentoProduct={products[5]}
        bentoProductTypes={products[5].types}
        productNumber="06"
      />

      <PastrySection indexes={[6]} altOffset={1} />

      <SingleCardService
        singleProduct={products[7]}
        singleProductTypes={products[7].types}
        productNumber="08"
      />

      <div className="w-full bg-white py-20 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center">
          {[
            { icon: "🎂", title: "Baked Fresh", sub: "Every single day" },
            { icon: "🛵", title: "Lagos Delivery", sub: "Island & Mainland" },
            { icon: "✨", title: "100% Real", sub: "No artificial flavors" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center w-full ${index === 1 ? "md:border-x md:border-gray-100 md:px-12" : ""}`}
            >
              <div className="text-4xl md:text-5xl mb-4 grayscale grayscale-50">
                {item.icon}
              </div>
              <p className="heading-text text-xl font-bold text-gray-900 mb-1">
                {item.title}
              </p>
              <p className="body-text text-sm text-gray-500 uppercase tracking-widest">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <PastrySection indexes={[8]} />

      <BentoServiceGrid
        bentoProduct={products[9]}
        bentoProductTypes={products[9].types}
        productNumber="10"
      />

      <CTASection isServices={true} />

      <div id="target-section">
        <ServiceSelection />
      </div>
    </div>
  );
};

export default Services;
