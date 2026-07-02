import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CakeCard = ({ id, img, name, price, description, onPage, isHome }) => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { currency } = useSelector((state) => state.cart);

  const isNumericPrice =
    price && !isNaN(Number(price.toString().replace(/,/g, "")));

  return (
    <>
      {onPage ? (
        <>
          {/* ── Mobile: horizontal list row ── */}
          <div className="group flex lg:hidden flex-row items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 cursor-pointer w-full">
            <Link
              to={`/products/${id}`}
              onClick={refreshPage}
              className="flex-shrink-0"
            >
              <img
                src={img}
                alt={name}
                className="w-25 h-25 md:w-35 md:h-35 object-cover rounded-xl"
              />
            </Link>
            <div className="flex flex-col flex-1 gap-1 min-w-0">
              <Link to={`/products/${id}`} onClick={refreshPage}>
                <h3 className="text-sm md:text-xl font-bold text-gray-800 line-clamp-1 sour-gummy">
                  {name}
                </h3>
              </Link>
              {description && (
                <p className="text-xs md:text-lg text-gray-500 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
              <div className="flex items-center justify-between mt-1">
                {price && (
                  <p className="text-sm md:text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {isNumericPrice && currency}
                    {isNumericPrice ? Number(price).toLocaleString() : price}
                  </p>
                )}
                <Link
                  to={`/products/${id}`}
                  onClick={refreshPage}
                  className="text-xs md:text-lg px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium flex-shrink-0"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* ── Desktop: original card ── */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-101 hover:-translate-y-2 w-full h-full flex-col cursor-pointer hidden lg:flex">
            <Link
              to={`/products/${id}`}
              onClick={refreshPage}
              className="block relative overflow-hidden flex-shrink-0"
            >
              <img
                src={img}
                alt={name}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-[1500ms] ease-out" />
            </Link>
            <div className="p-5 flex flex-col flex-1 gap-3">
              <Link to={`/products/${id}`} onClick={refreshPage}>
                <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-pink-400 transition-all duration-500 sour-gummy line-clamp-2">
                  {name}
                </h3>
              </Link>
              {description && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                  {description}
                </p>
              )}
              <div
                className={`flex ${price ? "justify-between" : "justify-center"} items-center gap-3 pt-4 border-t border-gray-100 mt-auto`}
              >
                {price && (
                  <p
                    className={`font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent ${isNumericPrice ? "text-lg lg:text-xl" : "text-sm lg:text-base text-center"}`}
                  >
                    {isNumericPrice && currency}
                    {isNumericPrice ? Number(price).toLocaleString() : price}
                  </p>
                )}
                <Link
                  to={`/products/${id}`}
                  onClick={refreshPage}
                  className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium transform hover:scale-103 shadow-md hover:shadow-lg overflow-hidden flex-shrink-0"
                >
                  <span className="relative z-10">View Details</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        // ── Category/slider card: image + name only ──
        <div className="group flex flex-col items-center gap-4 p-2 pt-4 cursor-pointer w-full overflow-visible">
          <Link
            to={isHome ? `/services/category/${id}` : `/products/${id}`}
            onClick={refreshPage}
            className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-2 block"
          >
            <img
              src={img}
              alt={name}
              className="h-[250px] w-[300px] md:h-[280px] md:w-[300px] lg:h-[300px] lg:w-[450px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-[1500ms] ease-out" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {isHome ? "View Category" : "View Product"}
              </span>
            </div>
          </Link>

          <div className="text-center max-w-[200px] md:max-w-[220px] lg:max-w-[250px]">
            <Link
              to={isHome ? `/services/category/${id}` : `/products/${id}`}
              onClick={refreshPage}
            >
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-pink-400 transition-all duration-500 sour-gummy line-clamp-2">
                {name}
              </h3>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CakeCard;
