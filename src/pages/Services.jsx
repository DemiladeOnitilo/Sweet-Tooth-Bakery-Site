import React from "react";
import ServiceSelection from "../components/Services/ServiceSelection";
import ServicesHero from "../components/Services/ServicesHero";
import PastrySection from "../components/Services/PastrySection";
import { scroller } from "react-scroll";
import CTASection from "../components/Home/CTASection";
import { products } from "../components/products";
import ViewAll from "../components/ViewAll";

const Services = ({ category }) => {
  const heroProduct = products[0];
  const heroProductTypes = heroProduct.types;
  const bentoProduct = products[5];
  const bentoProductTypes = bentoProduct.types;

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

      <div className="flex justify-center items-center w-full px-6 py-16 mx-auto bg-white ">
        <div className="flex flex-col md:flex-row rounded-3xl max-w-7xl overflow-hidden border border-pink-100 shadow-lg group hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 cursor-pointer">
          <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[220px] relative overflow-hidden">
            <img
              src={heroProduct.img}
              alt={heroProduct.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4 p-8 lg:p-12 bg-white">
            <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
              01 / {String(products.length).padStart(2, "0")}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {heroProduct.name}
                </span>
              </h1>

              <div className="h-1 w-26 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
            </div>

            <div className="text-gray-400 italic text-xl leading-relaxed">
              {heroProduct.description}
            </div>
            <div className="flex flex-col">
              <h3 className="text-gray-700 text-md font-medium leading-relaxed">
                Types
              </h3>
              <div className="flex flex-wrap text-gray-400 italic text-md leading-relaxed">
                {heroProductTypes.map((items, index) => (
                  <React.Fragment key={index}>
                    <span>{items.name.replace(/Brownies/gi, "").trim()}</span>
                    {index !== heroProductTypes.length - 1 && (
                      <span className="mx-2">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="items-end mt-2">
              <ViewAll to={`/services/category/${heroProduct.id}`} />
            </div>
          </div>
        </div>
      </div>

      <PastrySection indexes={[1, 2]} altOffset={2, 3} />

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

      <PastrySection indexes={[3, 4]} />

      {/* BentoGrid Product */}
      <div className="flex w-full py-12 px-6 mx-auto bg-white">
        <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto"> 
        <div className="flex flex-col gap-1 items-center text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
            06 / {String(products.length).padStart(2, "0")}
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {bentoProduct.name}
              </span>
            </h1>

            <div className="h-1 w-26 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
          </div>

          <div className="text-gray-400 italic text-xl leading-relaxed">
            {bentoProduct.description}
          </div>
          <div className="mt-2">
            <ViewAll to={`/services/category/${heroProduct.id}`} />
          </div>
        </div>

        <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 gap-3 h-[800px] md:h-[420px]">
          <div className="row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={bentoProductTypes[0].img}
              alt={bentoProductTypes[0].name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white text-md font-medium">
                {bentoProductTypes[0].name}
              </p>
              <p className="text-white/70 text-sm">Featured</p>
            </div>
          </div>
          {bentoProductTypes.slice(1, 3).map((items, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-1/2 md:h-full"
            >
              <img
                src={items.img}
                alt={items.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <p className="text-white text-sm font-medium">{items.name}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

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

      <PastrySection indexes={[6, 7, 8, 9]} />

      <CTASection isServices={true} />
      <div id="target-section">
        <ServiceSelection />
      </div>
    </div>
  );
};

export default Services;
