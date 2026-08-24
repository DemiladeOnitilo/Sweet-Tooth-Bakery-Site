import React from "react";

const GoalsCards = ({ img, main, content, index }) => {
  const formattedNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="group flex flex-col cursor-pointer h-full">
      
      <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 z-0">
        <img
          src={img}
          alt={main}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-500" />
      </div>

      <div className="relative z-10 flex-grow flex flex-col bg-white -mt-16 mx-4 md:mx-6 p-6 md:p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_50px_-15px_rgba(190,24,93,0.15)] border border-gray-50 group-hover:-translate-y-2 transition-all duration-500">
        
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="heading-text text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors duration-300 line-clamp-2">
            {main}
          </h3>
          <span className="heading-text text-3xl font-black text-pink-50 group-hover:text-pink-100 transition-colors duration-300">
            {formattedNumber}
          </span>
        </div>

        <p className="body-text text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
          {content}
        </p>

        <div className="w-0 h-[2px] bg-[#BE185D] mt-6 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
      
    </div>
  );
};

export default GoalsCards;