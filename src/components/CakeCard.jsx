import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight, FaShoppingCart } from "react-icons/fa";

const CakeCard = ({ id, img, name, price, description, size, onPage, isHome }) => {
  const { currency } = useSelector((state) => state.cart);

  const isNumericPrice = price && !isNaN(Number(price.toString().replace(/,/g, "")));
  const baseSizeLabel = Array.isArray(size) && size.length > 0 ? size[0].label : null;

  return (
    <div className="group flex flex-col w-full h-full cursor-pointer">
      
       <Link
        to={isHome ? `/services/category/${id}` : `/products/${id}`}
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gray-50 aspect-[4/5] md:aspect-square mb-3 md:mb-5 shadow-sm group-hover:shadow-xl transition-all duration-500 block"
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gray-900/0 md:group-hover:bg-gray-900/10 transition-colors duration-500 pointer-events-none" />
        
        <div className="hidden md:flex absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="bg-gray-900 text-white px-6 py-3 rounded-full body-text text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 whitespace-nowrap">
            {isHome ? "View Category" : "View Details"} <FaArrowRight className="text-[8px]" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col px-1 md:px-2 flex-grow">
        <Link to={isHome ? `/services/category/${id}` : `/products/${id}`}>
          <h3 className="heading-text text-sm sm:text-base md:text-xl font-bold text-gray-900 group-hover:text-[#BE185D] transition-colors line-clamp-2 md:line-clamp-1 leading-tight">
            {name}
          </h3>
        </Link>
        
        {onPage && description && (
          <p className="body-text text-gray-500 text-[10px] md:text-sm leading-relaxed mt-1 md:mt-1.5 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-end justify-between mt-auto pt-2 md:pt-2.5 gap-2">
          <div className="flex flex-col">
            {!isHome && price && (
              <p className="heading-text font-bold text-sm sm:text-base md:text-xl text-[#BE185D]">
                {isNumericPrice && currency}
                {isNumericPrice ? Number(price).toLocaleString() : price}
              </p>
            )}
            {baseSizeLabel && isNumericPrice && (
              <span className="body-text text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">
                / {baseSizeLabel}
              </span>
            )}
          </div>

          {!isHome && (
            <Link 
              to={`/products/${id}`}
              className="md:hidden w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#BE185D] hover:text-white transition-colors flex-shrink-0 border border-gray-100"
            >
              <FaShoppingCart className="text-[10px]" />
            </Link>
          )}
        </div>
      </div>

    </div>
  );
};

export default CakeCard;