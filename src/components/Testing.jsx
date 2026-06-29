import React from "react";
import Sliders from "./Sliders";
import { products } from "./products";
import ViewAll from "./ViewAll";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// One evocative blurb per product category — edit freely
const flavourBlurbs = {
  Brownies: "Rich, fudgy, and impossible to share. Baked fresh every morning.",
  "Cake Slices":
    "Every slice tells a story — moist layers, bold frosting, made for celebration.",
  "Celebration Cakes":
    "Towering layers, custom inscriptions, built for your biggest moments.",
  "Chin Chin":
    "Crunchy little bites of nostalgia. Seasoned, spiced, and totally addictive.",
  Cookies: "Crispy edges, chewy centres. The kind you hide from everyone else.",
  Cupcakes:
    "Little towers of joy — fluffy sponge, generous frosting, endlessly giftable.",
  Pies: "Buttery pastry, bold fillings. Comfort in every slice.",
  Doughnuts: "Pillowy, glazed, and gone in seconds. You'll need more than one.",
  "Chin Chin":
    "Small bites, big crunch. A Lagos staple done the Sweet Tooth way.",
  Puff: "Light, airy, and perfectly seasoned. The snack that disappears at every party.",
};

const TestimonialStrip = () => (
  <div className="w-full bg-gradient-to-r from-pink-50 to-purple-50 py-8 px-6 border-y border-pink-100">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          quote: "Best brownies in Lagos, full stop.",
          name: "Temi A.",
          area: "VI",
        },
        {
          quote: "My wedding cake was absolutely a dream.",
          name: "Chioma O.",
          area: "Lekki",
        },
        {
          quote: "Delivered on time, tasted perfect.",
          name: "Bolu K.",
          area: "Ikoyi",
        },
      ].map((t, i) => (
        <div
          key={i}
          className={`text-center px-4 ${i === 1 ? "md:border-x md:border-pink-200" : ""}`}
        >
          <p className="text-pink-500 text-sm mb-2">★★★★★</p>
          <p className="text-sm text-gray-600 italic leading-relaxed">
            "{t.quote}"
          </p>
          <p className="text-xs text-pink-700 font-medium mt-2">
            — {t.name}, {t.area}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const WhySweetTooth = () => (
  <div className="w-full bg-gradient-to-r from-pink-50 via-white to-purple-50 py-10 px-6 border-y border-pink-100/50">
    <p className="text-center text-xs font-medium text-purple-600 tracking-widest uppercase mb-8">
      Why Lagos loves Sweet Tooth
    </p>
    <div className="max-w-2xl mx-auto grid grid-cols-3 gap-8 text-center">
      {[
        { icon: "🎂", title: "Baked fresh", sub: "Every single day" },
        { icon: "🛵", title: "Lagos delivery", sub: "Island & Mainland" },
        { icon: "✨", title: "100% real", sub: "No artificial flavours" },
      ].map((item, i) => (
        <div
          key={i}
          className={i === 1 ? "border-x border-pink-200/60 px-4" : ""}
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <p className="text-sm font-medium text-pink-700">{item.title}</p>
          <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
        </div>
      ))}
    </div>
  </div>
);

// Bento grid layout — used for one mid-page category instead of a carousel
const BentoGrid = ({ product }) => {
  const types = product.types?.slice(0, 3) || [];
  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      <div
        className="grid grid-cols-2 grid-rows-2 gap-3"
        style={{ height: "320px" }}
      >
        {/* Featured large tile */}
        <div className="row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
          {types[0]?.img ? (
            <img
              src={types[0].img}
              alt={types[0].name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-500" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white text-sm font-medium">{types[0]?.name}</p>
            <p className="text-white/70 text-xs">Featured</p>
          </div>
        </div>
        {/* Two smaller tiles */}
        {types.slice(1, 3).map((type, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            {type.img ? (
              <img
                src={type.img}
                alt={type.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-400" />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <p className="text-white text-xs font-medium">{type.name}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-right mt-3">
        <ViewAll to={`/services/category/${product.id}`} />
      </p>
    </div>
  );
};

const Testing = ({ onPage = true, category }) => {
  const filteredProducts = category
    ? products.filter(
        (product) =>
          product.id === category ||
          product.name.toLowerCase() === category.toLowerCase(),
      )
    : products;

  return (
    <div className="flex flex-col">
      {filteredProducts.map((product, index) => {
        const isAlt = index % 2 === 1;
        const blurb = flavourBlurbs[product.name] || "";
        const isSplitHero = onPage && index === 0;
        const isBento = onPage && index === 3;

        return (
          <React.Fragment key={index}>
            <section
              className={`flex flex-col justify-center items-center gap-8 w-full py-16 ${
                isAlt
                  ? "bg-gradient-to-br from-gray-50 via-pink-50/30 to-purple-50/30"
                  : "bg-white"
              }`}
            >
              {/* ── Breadcrumb (ViewAll page only) ── */}
              {!onPage && (
                <nav className="w-full max-w-7xl px-4 flex items-center gap-2 text-sm text-gray-500">
                  <Link
                    to="/"
                    className="hover:text-pink-600 transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <FaChevronRight className="text-xs" />
                  <Link
                    to="/services"
                    className="hover:text-pink-600 transition-colors duration-300"
                  >
                    Services
                  </Link>
                  {category?.name && (
                    <>
                      <FaChevronRight className="text-xs" />
                      <Link
                        to={`/services/category/${category.name}`}
                        className="hover:text-pink-600 transition-colors duration-300"
                      >
                        {category.name}
                      </Link>
                    </>
                  )}
                  <FaChevronRight className="text-xs" />
                  <span className="text-gray-800 font-medium">
                    {product.name}
                  </span>
                </nav>
              )}

              {/* ── SPLIT HERO (index 0 only) ── */}
              {isSplitHero ? (
                <div className="w-full max-w-7xl px-4">
                  <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-pink-100 shadow-lg">
                    {/* Image side */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[280px] relative overflow-hidden">
                      {product.img ? (
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : product.types?.[0]?.img ? (
                        <img
                          src={product.types[0].img}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400" />
                      )}
                    </div>

                    {/* Copy side */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4 p-8 md:p-12 bg-white">
                      {onPage && (
                        <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs font-medium">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(filteredProducts.length).padStart(2, "0")}
                        </div>
                      )}

                      <h1 className="text-4xl lg:text-5xl font-bold text-left">
                        <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                          {product.name}
                        </span>
                      </h1>

                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />

                      {blurb && (
                        <p className="text-gray-500 italic text-sm leading-relaxed max-w-xs">
                          "{blurb}"
                        </p>
                      )}

                      <ViewAll to={`/services/category/${product.id}`} />
                    </div>
                  </div>
                </div>
              ) : (
                /* ── STANDARD HEADER (all other indexes) ── */
                <div className="flex flex-col justify-center items-center gap-3 w-full max-w-7xl px-4 text-center">
                  {onPage && (
                    <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs md:text-sm font-medium">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(filteredProducts.length).padStart(2, "0")}
                    </div>
                  )}

                  <h1 className="text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {product.name}
                    </span>
                  </h1>

                  <div className="h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />

                  {blurb && (
                    <p className="text-gray-500 italic text-sm leading-relaxed max-w-md mt-1">
                      "{blurb}"
                    </p>
                  )}

                  {onPage && (
                    <div className="mt-2">
                      <ViewAll to={`/services/category/${product.id}`} />
                    </div>
                  )}
                </div>
              )}

              {/* ── BENTO GRID or CAROUSEL ── */}
              {isBento ? (
                <BentoGrid product={product} />
              ) : (
                <div className="w-full max-w-7xl px-4">
                  <Sliders main={product.types} onPage={onPage} />
                </div>
              )}
            </section>

            {/* ── TESTIMONIAL STRIP after index 1 ── */}
            {onPage && index === 1 && <TestimonialStrip />}

            {/* ── WHY SWEET TOOTH band after index 4 ── */}
            {onPage && index === 4 && <WhySweetTooth />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Testing;
