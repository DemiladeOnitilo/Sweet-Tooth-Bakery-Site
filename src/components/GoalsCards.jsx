import React from "react";

const GoalsCards = ({ img, main, content }) => {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
      
      {/* Image Container - Clean circle with subtle shadow, replacing the heavy rings */}
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
        <img
          src={img}
          alt={main}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Subtle premium overlay */}
        <div className="absolute inset-0 bg-[#BE185D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-1 text-center">
        <h3 className="heading-text text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#BE185D] transition-colors duration-300">
          {main}
        </h3>
        
        <p className="body-text text-gray-600 text-sm md:text-base font-medium leading-relaxed flex-1">
          {content}
        </p>
      </div>

      {/* Minimalist decorative dot to replace the flashy gradient dot */}
      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="w-1.5 h-1.5 rounded-full bg-[#BE185D]" />
      </div>
      
    </div>
  );
};

export default GoalsCards;