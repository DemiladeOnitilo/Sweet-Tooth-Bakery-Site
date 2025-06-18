import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CakeCard = ({ id, img, name, price, description, onPage, isHome,  }) => {

  const refreshPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { currency } = useSelector((state) => state.cart);

  return (
    <>
      {onPage ? (
        <div className="flex flex-col bg-white h-auto shadow-sm gap-2 justify-center items-center hover:shadow-lg hover:max-w-lg hover:transition hover:duration-300 hover:ease-in-out hover:scale-100 hover:overflow-hidden ">
          <Link to={`/products/${id}`} onClick={refreshPage} className="relative bg-cover bg-no-repeat rounded-xl cursor-pointer w-full h-full">
            <img src={img} className="h-50 w-full md:h-100 md:w-100 lg:h-80 lg:w-80"/>
          </Link>
          <div className="flex flex-col justify-center items-center lg:w-70 md:w-60 w-auto h-auto gap-2 p-5 ">
            <div className="text-center">
              <Link to={`/products/${id}`} onClick={refreshPage} className="text-2xl hover:text-[#f86a82] cursor-pointer sour-gummy">
                {name}
              </Link>
            </div>
            <div className='flex flex-col gap-y-2'>
              <p>{description}</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-x-10 gap-y-3 ">
              <p className="text-xl font-semibold">{currency}{price}</p>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <Link to={isHome ? `/category/${id}` : `/products/${id}`} onClick={refreshPage} className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-xl">
            <img src={img} className="h-[300px] w-[250px] shadow-md max-w-xs transition duration-300 ease-in-out hover:scale-110" />
          </Link>
          <div className="w-50 h-20 text-center">
            <Link to={isHome ? `/category/${id}` : `/products/${id}`} onClick={refreshPage} className="text-2xl hover:text-[#f86a82] sour-gummy">
              {name}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CakeCard;
