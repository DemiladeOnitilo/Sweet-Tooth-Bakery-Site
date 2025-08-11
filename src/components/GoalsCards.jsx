import React, { useState } from "react";

const GoalsCards = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[450px] md:h-[480px] lg:h-[500px] bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-pink-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        <div className="relative mb-8">
          <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto">
            <img
              src={props.img}
              alt={props.main}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-4 border-pink-200/30 group-hover:border-pink-400/50 transition-colors duration-500" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-500">
              {props.main}
            </span>
          </h3>

          <p className="text-gray-700 text-base lg:text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
            {props.content}
          </p>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className={`w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalsCards;
