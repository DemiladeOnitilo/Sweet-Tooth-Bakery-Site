import React from "react";

const Values = ({ img, name, content }) => {
  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col cursor-pointer">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-pink-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow border */}
      <div className="absolute inset-0 rounded-3xl border border-pink-300/40 group-hover:border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.2)] group-hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-500 z-10 pointer-events-none" />

      {/* Image — fixed height, never compresses */}
      <div className="relative flex-shrink-0 overflow-hidden rounded-t-3xl">
        <img
          src={img}
          alt={name}
          className="w-full h-56 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-[1500ms] ease-out" />
      </div>

      {/* Text content — flex-1 so equal height across grid row */}
      <div className="relative z-10 flex flex-col flex-1 gap-3 p-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-500 sour-gummy">
          {name}
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed flex-1 group-hover:text-gray-800 transition-colors duration-300">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Values;