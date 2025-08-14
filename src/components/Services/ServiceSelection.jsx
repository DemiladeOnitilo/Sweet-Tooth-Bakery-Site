import React from "react";
import ServiceCakeCard from "./ServiceCakeCard";
import { MdChevronLeft } from "react-icons/md";
import { products } from "../products";
import { Link } from "react-router-dom";

const ServiceSelection = ({ onService = false, onCategoryClick }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleBackClick = () => {
    if (onService) {
      refreshPage();
      // In a real app, this would navigate to /Services
      console.log("Navigating back to Services page");
    }
  };

  const handleCategoryClick = (categoryId, categoryName) => {
    refreshPage();
    if (onCategoryClick) {
      onCategoryClick(categoryId, categoryName);
    } else {
      // In a real app, this would navigate to /category/${categoryId}
      console.log(`Navigating to category: ${categoryName} (ID: ${categoryId})`);
    }
  };

  let back = onService ? (
    <button onClick={handleBackClick} className="absolute left-0">
      <ChevronLeft className="h-10 w-10 bg-black text-white rounded-3xl p-2 hover:bg-gray-800 transition-colors duration-300" />
    </button>
  ) : null;

  return (
    <div className="flex flex-col gap-5 items-center justify-center text-center py-10 px-4">
      <div className="flex justify-center items-center w-full max-w-4xl relative mt-8">
        {back}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
            Selections
          </span>
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 max-w-6xl mx-auto lg:grid-cols-3 xl:grid-cols-3">
        {products.map((pastry) => {
          return (
            <div key={pastry.id}>
              <button
                onClick={() => handleCategoryClick(pastry.id, pastry.name)}
                className="flex flex-col gap-y-2 justify-center items-center w-full"
              >
                <ServiceCakeCard {...pastry} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;
