import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CakeCard = ({ id, img, name, price, description, onPage, isHome }) => {
  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { currency } = useSelector((state) => state.cart);

  return (
    <>
      {onPage ? (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 max-w-sm mx-auto">
          <Link 
            to={`/products/${id}`} 
            onClick={refreshPage} 
            className="block relative overflow-hidden"
          >
            <img 
              src={img} 
              alt={name}
              className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </Link>
          
          <div className="p-6 space-y-4">
            <div className="text-center">
              <Link 
                to={`/products/${id}`} 
                onClick={refreshPage} 
                className="text-xl lg:text-2xl font-bold text-gray-800 hover:text-pink-500 transition-colors duration-200 sour-gummy line-clamp-2"
              >
                {name}
              </Link>
            </div>
            
            {description && (
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-3">
                {description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-100">
              <p className="text-xl lg:text-2xl font-bold text-pink-500">
                {currency}{price}
              </p>
              <Link
                to={`/products/${id}`}
                onClick={refreshPage}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="group flex flex-col items-center space-y-3 p-2">
          <Link 
            to={isHome ? `/category/${id}` : `/products/${id}`} 
            onClick={refreshPage} 
            className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img 
              src={img} 
              alt={name}
              className="h-[250px] w-[200px] md:h-[280px] md:w-[220px] lg:h-[300px] lg:w-[250px] object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {isHome ? 'View Category' : 'View Product'}
              </span>
            </div>
          </Link>
          
          <div className="text-center max-w-[200px] md:max-w-[220px] lg:max-w-[250px]">
            <Link 
              to={isHome ? `/category/${id}` : `/products/${id}`} 
              onClick={refreshPage} 
              className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 hover:text-pink-500 transition-colors duration-200 sour-gummy line-clamp-2"
            >
              {name}
            </Link>
          </div>
          
          {!isHome && price && (
            <p className="text-lg font-semibold text-pink-500">
              {currency}{price}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default CakeCard;