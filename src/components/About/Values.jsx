import React from "react";

const Values = ({ img, name, content }) => {
  return (
    <div className="group relative w-full h-[350px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
      
      <img
        src={img}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-500" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        
        <div className="w-12 h-1 bg-[#BE185D] mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        
        <h3 className="heading-text text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-pink-100 transition-colors">
          {name}
        </h3>
        
        <p className="body-text text-white/80 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors">
          {content}
        </p>
      </div>
      
    </div>
  );
};

export default Values;