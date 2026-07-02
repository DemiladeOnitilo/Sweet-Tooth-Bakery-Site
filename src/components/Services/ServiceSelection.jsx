import React from "react";
import ServiceCakeCard from "./ServiceCakeCard";
import { MdChevronLeft } from "react-icons/md";
import { products } from "../products";
import { Link } from "react-router-dom";

const ServiceSelection = ({
  excludeId,
  badge = "🍰 Browse Our Menu",
  title = "EXPLORE OUR",
  highlight = "SELECTIONS",
  subtitle = "From rich cakes to delicate pastries, find the perfect treat for every occasion.",
}) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const visibleProducts = excludeId
    ? products.filter((pastry) => pastry.id !== excludeId)
    : products;

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center text-center py-10 px-5">
      <div className="flex flex-col gap-4 items-center text-center max-w-4xl mx-auto">
        <div className="inline-flex gap-2 justify-center items-center w-fit px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200/50 rounded-full text-pink-700 text-xs lg:text-sm font-medium">
          {badge}
        </div>
        <div className="flex flex-col gap-2 items-center text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold">
            {title}{" "}
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-4 justify-center">
        {visibleProducts.map((pastry) => {
          return (
            <div key={pastry.id}>
              <Link
                to={`/services/category/${pastry.id}`}
                onClick={refreshPage}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <ServiceCakeCard {...pastry} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
