import React from 'react';

const Icon = ({ img, name, info }) => {
  return (
    <div className="relative flex flex-col items-center text-center w-full lg:max-w-xs p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      
      {/* Icon Capsule circle */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 h-14 w-14 rounded-full flex justify-center items-center shadow-md shadow-pink-500/10 mb-4">
        {img}
      </div>
      
      <div className="flex flex-col items-center flex-1 justify-center">
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed max-w-[200px]">
          {info}
        </p>
      </div>
    </div>
  );
};

export default Icon;