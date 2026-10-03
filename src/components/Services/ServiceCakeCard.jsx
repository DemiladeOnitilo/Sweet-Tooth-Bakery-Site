import React from "react";

const ServiceCakeCard = ({ name, img }) => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center group w-full cursor-pointer">
      <div className="relative overflow-hidden rounded-[2rem] shadow-sm group-hover:shadow-xl transition-all duration-500 w-full aspect-square max-w-[200px] md:max-w-[260px] bg-gray-50">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500 pointer-events-none"></div>
      </div>

      <div className="text-center px-2">
        <h3 className="heading-text text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors duration-300">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCakeCard;