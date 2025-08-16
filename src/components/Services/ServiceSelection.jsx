import React from "react";
import ServiceCakeCard from "./ServiceCakeCard";
import { MdChevronLeft } from "react-icons/md";
import { products } from "../products";
import { Link } from "react-router-dom";

const ServiceSelection = ({ onService = false }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  let back = onService ? (
    <Link to="/Services" onClick={refreshPage} className="absolute left-0">
      <MdChevronLeft className="h-10 w-10 bg-black text-white rounded-3xl" />
    </Link>
  ) : null;

  return (
    <div className="flex flex-col gap-5 items-center justify-center text-center py-10">
      <div className="flex justify-center items-center w-320 relative">
        {back}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent sour-gummy">
            Selections
          </span>
        </h2>
      </div>
      <div className="grid grid-row-3 grid-cols-2 gap-3 md:gap-5 lg:flex lg:flex-wrap lg:gap-4 lg:justify-center lg:items-center w-auto">
        {products.map((pastry) => {
          return (
            <div key={pastry.id}>
              <Link
                to={`/category/${pastry.id}`}
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
