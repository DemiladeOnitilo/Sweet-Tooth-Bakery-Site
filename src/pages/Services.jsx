import React from "react";
import ServiceSelection from "../components/Services/ServiceSelection";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import { scroller } from "react-scroll";
import CTASection from "../components/Home/CTASection";
import { products } from "../components/products";
import ViewAll from "../components/ViewAll";
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

      <div className="w-full bg-gradient-to-r from-pink-50 to-purple-50 py-12 px-6 border-y border-gray-100">
        <p className="text-center text-xs font-medium text-gray-400 tracking-widest uppercase mb-8">
          What our customers say
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              initials: "TA",
              name: "Temi A.",
              area: "Victoria Island",
              date: "May 2026",
              rating: 5,
              quote: "Best brownies in Lagos, full stop.",
            },
            {
              initials: "CO",
              name: "Chioma O.",
              area: "Lekki",
              date: "Jan 2026",
              rating: 5,
              quote: "My wedding cake was absolutely a dream.",
            },
            {
              initials: "BK",
              name: "Bolu K.",
              area: "Ikoyi",
              date: "Dec 2025",
              rating: 4.5,
              quote: "Delivered on time, tasted perfect.",
            },
          ].map((items, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill={
                      s <= Math.floor(items.rating)
                        ? "#D4537E"
                        : s - 0.5 === items.rating
                          ? "url(#half)"
                          : "#e5e7eb"
                    }
                  >
                    <defs>
                      <linearGradient id="half">
                        <stop offset="50%" stopColor="#D4537E" />
                        <stop offset="50%" stopColor="#e5e7eb" />
                      </linearGradient>
                    </defs>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 italic">
                <span className="text-pink-400 text-lg leading-none mr-0.5">
                  "
                </span>
                {items.quote}
                <span className="text-pink-400 text-lg leading-none ml-0.5">
                  "
                </span>
              </p>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-pink-700 text-xs font-medium">
                    {items.initials}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      {items.name}
                    </p>
                    <p className="text-xs text-gray-400">{items.area}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{items.date}</p>
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

      {/* BentoGrid Product */}
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

      <div className="w-full bg-gradient-to-r from-pink-50 to-purple-50 py-16 px-6 border-y border-pink-100/50">
        <p className="text-center text-xs font-medium text-purple-600 tracking-widest uppercase mb-10">
          Why Lagos loves Sweet Tooth
        </p>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-center items-center gap-10 text-center">
          {[
            { icon: "🎂", title: "Baked fresh", sub: "Every single day" },
            { icon: "🛵", title: "Lagos delivery", sub: "Island & Mainland" },
            { icon: "✨", title: "100% real", sub: "No artificial flavours" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex-1 ${index === 1 ? "md:border-x md:border-pink-200/60 md:px-10" : ""}`}
            >
              <div className="text-4xl md:text-5xl mb-3">{item.icon}</div>
              <p className="text-sm md:text-base font-medium text-pink-700">
                {item.title}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
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
