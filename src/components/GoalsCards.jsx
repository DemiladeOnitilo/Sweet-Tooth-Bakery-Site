import React, { useState } from "react";

const GoalsCards = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center gap-4 h-full bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl px-8 pt-12 pb-4 text-center shadow-lg hover:shadow-2xl transform hover:scale-[1.05] hover:-translate-y-2 transition-all duration-500 cursor-pointer">
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-pink-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image — fixed size, no absolute border fighting it */}
        <div className="relative flex-shrink-0">
          <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto ring-4 ring-pink-200/30 group-hover:ring-pink-400/50 transition-all duration-500">
            <img
              src={props.img}
              alt={props.main}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Text content — flex-1 fills remaining space, mt-auto pins footer dot */}
        <div className="relative flex-1 flex flex-col gap-2 w-full">
          <h3 className="text-2xl lg:text-3xl font-bold">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-500">
              {props.main}
            </span>
          </h3>

          <p className="text-gray-700 text-sm md:text-lg leading-relaxed font-base group-hover:text-gray-800 transition-colors duration-300 flex-1">
            {props.content}
          </p>

          {/* Dot pinned to bottom of text area */}
          <div className="flex justify-center mt-auto pt-2">
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsCards;