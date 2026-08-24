import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

const CakeCard = ({ id, img, name, price, description, size, onPage, isHome }) => {
  const { currency } = useSelector((state) => state.cart);

  const isNumericPrice = price && !isNaN(Number(price.toString().replace(/,/g, "")));
  const baseSizeLabel = Array.isArray(size) && size.length > 0 ? size[0].label : null;

  return (
    <>
      {onPage ? (
        <div className="group flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 w-full h-full cursor-pointer">
          
          <Link to={`/products/${id}`} className="block relative overflow-hidden aspect-[4/3] w-full bg-gray-50">
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#BE185D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Link>
          
          <div className="p-4 md:p-6 flex flex-col flex-1">
            <Link to={`/products/${id}`}>
              <h3 className="heading-text text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors line-clamp-1">
                {name}
              </h3>
            </Link>
            
            {description && (
              <p className="body-text text-gray-500 text-xs md:text-sm leading-relaxed mt-1.5 md:mt-2 line-clamp-2">
                {description}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-4 md:pt-6 border-t border-gray-50">
              {price && (
                <div className="flex items-baseline gap-1.5">
                  <p className="body-text font-bold text-base md:text-xl text-[#BE185D]">
                    {isNumericPrice && currency}
                    {isNumericPrice ? Number(price).toLocaleString() : price}
                  </p>
                  {baseSizeLabel && isNumericPrice && (
                    <span className="body-text text-[10px] md:text-xs text-gray-400 font-medium">
                      / {baseSizeLabel}
                    </span>
                  )}
                </div>
              )}
              
              <Link
                to={`/products/${id}`}
                className="body-text text-xs md:text-sm font-semibold text-gray-800 flex items-center gap-1.5 group-hover:text-[#BE185D] transition-colors"
              >
                Details <FaArrowRight className="text-[10px] md:text-xs group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="group flex flex-col w-full h-full cursor-pointer">
          <Link
            to={isHome ? `/services/category/${id}` : `/products/${id}`}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-1 block aspect-[4/3] bg-gray-50"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/30 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="body-text bg-white/95 backdrop-blur-sm text-[#BE185D] px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {isHome ? "View Category" : "View Product"}
              </span>
            </div>
          </Link>

          <div className="text-center mt-3 md:mt-5">
            <Link to={isHome ? `/services/category/${id}` : `/products/${id}`}>
              <h3 className="heading-text text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors">
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