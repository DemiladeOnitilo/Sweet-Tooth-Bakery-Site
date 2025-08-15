import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CakeCard = ({ id, img, name, price, description, onPage, isHome }) => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { currency } = useSelector((state) => state.cart);

  return (
    <>
      {onPage ? (
        <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 max-w-sm mx-auto cursor-pointer">
          <Link
            to={`/products/${id}`}
            onClick={refreshPage}
            className="block relative overflow-hidden"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
          </Link>

          <div className="p-6 space-y-4">
            <div className="text-center">
              <Link
                to={`/products/${id}`}
                onClick={refreshPage}
                className="relative inline-block"
              >
                <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-pink-400 transition-all duration-500 transform group-hover:scale-105 sour-gummy line-clamp-2">
                  {name}
                </h3>
              </Link>
            </div>

            {description && (
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-3">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-100">
              <p className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {currency}
                {price}
              </p>
              <Link
                to={`/products/${id}`}
                onClick={refreshPage}
                className="group/btn relative px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10">View Details</span>

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700 ease-out"></div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="group flex flex-col items-center gap-4 p-2">
          <Link
            to={isHome ? `/category/${id}` : `/products/${id}`}
            onClick={refreshPage}
            className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
          >
            <img
              src={img}
              alt={name}
              className="h-[250px] w-[200px] md:h-[280px] md:w-[220px] lg:h-[300px] lg:w-[250px] object-cover transition-transform duration-700 ease-out"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {isHome ? "View Category" : "View Product"}
              </span>
            </div>
          </Link>

          <div className="text-center max-w-[200px] md:max-w-[220px] lg:max-w-[250px]">
            <Link
              to={isHome ? `/category/${id}` : `/products/${id}`}
              onClick={refreshPage}
              className="relative inline-block"
            >
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-pink-400 transition-all duration-500 transform group-hover:scale-105 sour-gummy line-clamp-2">
                {name}
              </h3>
              <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-700 ease-out"></div>
            </Link>
          </div>

          {!isHome && price && (
            <p className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {currency}
              {price}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CakeCard;
