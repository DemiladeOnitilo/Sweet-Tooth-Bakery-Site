import React from "react";
import ServiceCakeCard from "./ServiceCakeCard";
import { products } from "../products";
import { Link } from "react-router-dom";

const ServiceSelection = ({
  excludeId,
  badge = "Browse Our Menu",
  title = "Explore Our",
  highlight = "Selections",
  subtitle = "From rich cakes to delicate pastries, find the perfect treat for every occasion.",
}) => {
  const visibleProducts = excludeId
    ? products.filter((pastry) => pastry.id !== excludeId)
    : products;

  return (
    <section className="w-full py-20 px-6 ">
      <div className="flex flex-col gap-12 items-center justify-center max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto">
          <div className="body-text flex items-center gap-3 text-sm font-bold text-[#BE185D] tracking-widest uppercase">
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
            {badge}
            <span className="w-8 h-[1px] bg-[#BE185D]"></span>
          </div>

          <h2 className="heading-text text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {title} <span className="text-[#BE185D] italic">{highlight}</span>
          </h2>

          <p className="body-text text-base md:text-xl text-gray-600 max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6 md:gap-x-4 md:gap-y-8 justify-center w-full mt-4">
          {visibleProducts.map((pastry) => (
            <Link
              key={pastry.id}
              to={`/services/category/${pastry.id}`}
              className="flex flex-col justify-center items-center"
            >
              <ServiceCakeCard {...pastry} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;
