import React from "react";

const ServiceCakeCard = ({ name, img }) => {
  function refreshPage() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-y-3 justify-center items-center group">
      <div
        onClick={refreshPage}
        className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 cursor-pointer"
      >
        <div className="relative">
          <img
            src={img}
            alt={name}
            className="h-44 w-44 md:h-72 md:w-72 lg:h-64 lg:w-64 object-cover transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
        </div>
      </div>

      <div onClick={refreshPage} className="relative curosr-pointer">
        <h1 className="text-3xl md:text-4xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-pink-400 transition-all duration-500 transform group-hover:scale-105 sour-gummy">
          {name}
        </h1>
      </div>
    </div>
  );
};
export default ServiceCakeCard;
